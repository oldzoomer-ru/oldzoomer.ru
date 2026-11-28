// GitHub API response types (matching Java records)

export interface GitHubProfileLink {
  url: string;
  title: string;
}

export interface GitHubProfile {
  login: string;
  name: string;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  location: string | null;
  email: string | null;
  blog: string | null;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  created_at: string;
  updated_at: string;
  links?: GitHubProfileLink[];
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  private: boolean;
  default_branch: string;
  updated_at: string;
  topics: string[];
}

export interface GitHubCommit {
  sha: string;
  message: string;
  html_url: string;
  authorLogin: string;
  authorAvatarUrl: string;
  committedDate: string;
}

export interface GitHubGistFile {
  filename: string;
  language: string | null;
  content_type: string | null;
  size: number;
}

export interface GitHubGist {
  id: string;
  description: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
  comments: number;
  files: Record<string, GitHubGistFile>;
}

export interface GitHubActivity {
  recentCommits: GitHubCommit[];
  recentRepos: GitHubRepo[];
}

export interface GitHubData {
  profile: GitHubProfile;
  profileReadme: string;
  allRepos: GitHubRepo[];
  gists: GitHubGist[];
  activity: GitHubActivity;
}

// Display types (matching GitHubDisplayService.SectionItem)

export interface SectionItem {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  url: string | null;
  isHtml: boolean;
}

export interface GitHubDisplayData {
  fullName: string;
  bio: string;
  contactInfo: string;
  profileReadme: SectionItem[];
  allRepos: SectionItem[];
  gists: SectionItem[];
  activity: SectionItem[];
  stats: SectionItem[];
  profile: GitHubProfile;
  rawRepos: GitHubRepo[];
  rawGists: GitHubGist[];
}
