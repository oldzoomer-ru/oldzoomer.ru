import type { GitHubProfile, GitHubRepo, GitHubGist, GitHubActivity, GitHubCommit } from '../types/github';
import type { GitHubData } from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';
const USERNAME = 'oldzoomer-ru';

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!response.ok) {
    throw new Error(`GitHub API error: HTTP ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchProfile(): Promise<GitHubProfile> {
  return fetchJson<GitHubProfile>(`${GITHUB_API_BASE}/users/${USERNAME}`);
}

export async function fetchProfileReadme(): Promise<string> {
  const data = await fetchJson<any>(`${GITHUB_API_BASE}/repos/${USERNAME}/${USERNAME}/readme`);
  if (!data?.content) return '';
  if (data.encoding === 'base64') {
    return atob(data.content);
  }
  return data.content;
}

export async function fetchAllRepos(): Promise<GitHubRepo[]> {
  return fetchJson<GitHubRepo[]>(`${GITHUB_API_BASE}/users/${USERNAME}/repos?per_page=100&type=owner&sort=updated`);
}

export async function fetchGists(): Promise<GitHubGist[]> {
  return fetchJson<GitHubGist[]>(`${GITHUB_API_BASE}/users/${USERNAME}/gists?per_page=100`);
}

export async function fetchActivity(): Promise<GitHubActivity> {
  const events = await fetchJson<any[]>(`${GITHUB_API_BASE}/users/${USERNAME}/events?per_page=100`);

  const commits: GitHubCommit[] = [];
  for (const event of events) {
    if (event.type !== 'PushEvent') continue;
    if (commits.length >= 10) break;
    const payload = event.payload as any;
    const commitIds = payload?.commit_ids as string[];
    if (!commitIds || commitIds.length === 0) continue;
    const sha = commitIds[0];
    const repoName = event.repo.name;
    try {
      const commitData = await fetchJson<any>(`${GITHUB_API_BASE}/repos/${repoName}/commits/${sha}`);
      const commitObj = commitData.commit as any;
      const author = commitData.author as any;
      commits.push({
        sha,
        message: commitObj?.message ?? '',
        html_url: commitData.html_url ?? '',
        authorLogin: author?.login ?? '',
        authorAvatarUrl: author?.avatar_url ?? '',
        committedDate: commitObj?.committed_date ?? '',
      });
    } catch { /* skip */ }
  }

  const recentRepos: GitHubRepo[] = [];
  for (const event of events) {
    if (event.type !== 'CreateEvent') continue;
    if (recentRepos.length >= 5) break;
    const repo = event.repo as any;
    if (!repo) continue;
    try {
      const repoData = await fetchJson<GitHubRepo>(`${GITHUB_API_BASE}/repos/${repo.name}`);
      recentRepos.push(repoData);
    } catch { /* skip */ }
  }

  return { recentCommits: commits, recentRepos };
}

export async function fetchAllGitHubData(): Promise<GitHubData> {
  const [profile, profileReadme, allRepos, gists, activity] = await Promise.all([
    fetchProfile(), fetchProfileReadme(), fetchAllRepos(), fetchGists(), fetchActivity(),
  ]);
  return { profile, profileReadme, allRepos, gists, activity };
}
