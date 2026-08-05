export const PROFILE = {
  name: "Kunal Vibhute",
  role: "Backend Engineer & AI Developer",
  location: "India",
  email: "kunal.vibhute@example.com",
  phone: "+91 00000 00000",
  resumeUrl: "/api/resume",
  about:
    "I'm a software developer with around two years of experience building backend systems and AI-powered applications. My work spans REST APIs, agentic workflows, retrieval-augmented generation, and the MCP-based tool integrations that connect them — all designed to run reliably at scale, not just work on a laptop.",
};

export const SOCIALS = {
  github: "https://github.com/kunalvibhute",
  linkedin: "https://linkedin.com/in/kunalvibhute",
  leetcode: "https://leetcode.com/kunalvibhute",
  portfolio: "https://kunalvibhute.dev",
  email: "mailto:kunal.vibhute@example.com",
};

export const TERMINAL_LINES = [
  { prompt: "whoami", output: ["Kunal Vibhute"] },
  { prompt: "cat roles.txt", output: ["Backend Engineer", "AI Developer", "Node.js Developer"] },
  { prompt: "./start-portfolio.sh", output: ["Loading portfolio..."] },
];

export const FLOATING_TECH = [
  "Node.js",
  "React",
  "Docker",
  "MongoDB",
  "AWS",
  "Python",
  "Redis",
  "LangChain",
  "LangGraph",
  "Prometheus",
  "Grafana",
  "Loki",
];

export const TECH_GROUPS: { title: string; items: string[] }[] = [
  { title: "Languages", items: ["JavaScript", "Python", "PHP", "Java", "SQL"] },
  { title: "Frontend", items: ["React", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "Express", "REST APIs"] },
  {
    title: "AI",
    items: ["LangChain", "LangGraph", "AI Agents", "MCP", "RAG", "Vector Databases", "Ollama"],
  },
  { title: "Databases", items: ["MongoDB", "MySQL", "Redis", "Firebase"] },
  { title: "Cloud & Tools", items: ["AWS", "Docker", "Linux", "Git", "Postman"] },
];
