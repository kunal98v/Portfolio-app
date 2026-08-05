export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
}

export interface CaseStudy {
  problem: string;
  solution: string;
  architecture: string[];
  challenges: string[];
}

export interface ProjectDetail extends Project {
  caseStudy: CaseStudy;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface Certification {
  id: string;
  issuer: string;
  title: string;
  year: string;
}

export interface GithubStats {
  username: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  profileUrl: string;
  topLanguages: { language: string; count: number }[];
}
