const express = require("express");

const router = express.Router();

let cache = { data: null, expiresAt: 0 };
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

async function githubFetch(url) {
  const headers = { "User-Agent": "portfolio-app" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

// GET /api/github/stats - profile + language breakdown for the configured username
router.get("/stats", async (req, res) => {
  const username = req.query.username || process.env.GITHUB_USERNAME;
  if (!username) return res.status(400).json({ error: "No GitHub username configured" });

  if (cache.data && cache.expiresAt > Date.now() && cache.data.username === username) {
    return res.json(cache.data);
  }

  try {
    const [profile, repos] = await Promise.all([
      githubFetch(`https://api.github.com/users/${username}`),
      githubFetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
    ]);

    const languageCounts = {};
    for (const repo of repos) {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    }
    const topLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([language, count]) => ({ language, count }));

    const data = {
      username,
      name: profile.name,
      avatarUrl: profile.avatar_url,
      bio: profile.bio,
      publicRepos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      profileUrl: profile.html_url,
      topLanguages,
    };

    cache = { data, expiresAt: Date.now() + CACHE_TTL_MS };
    res.json(data);
  } catch (err) {
    console.error("GitHub stats fetch failed:", err.message);
    res.status(502).json({ error: "Could not fetch GitHub stats right now" });
  }
});

module.exports = router;
