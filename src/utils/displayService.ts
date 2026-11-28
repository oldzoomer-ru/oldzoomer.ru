import type { GitHubData, GitHubDisplayData, GitHubProfile, SectionItem, GitHubRepo, GitHubGist, GitHubActivity, GitHubCommit } from '../types/github';

const DATE_FMT = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' });

function formatDate(isoDate: string | null | undefined): string {
  if (!isoDate) return '';
  try {
    return DATE_FMT.format(new Date(isoDate + 'T00:00:00Z'));
  } catch {
    return isoDate;
  }
}

function buildContactInfo(profile: GitHubProfile): string {
  const parts: string[] = [];
  if (profile.location) parts.push(profile.location);
  if (profile.email) parts.push(profile.email);
  if (profile.blog) {
    const blog = profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`;
    parts.push(blog);
  }
  return parts.join(' \u00b7 ');
}

function extractFirstHeading(readme: string): string {
  const match = readme.match(/^#{1,6}\s+(.+)$/m);
  return match ? match[1].trim() : 'README';
}

function starCount(count: number): string {
  return count > 0 ? '\u2b50 ' + count : '';
}

export function toDisplayData(data: GitHubData): GitHubDisplayData {
  const profile = data.profile;
  const fullName = profile.name?.trim() || profile.login || 'GitHub user';
  const bio = profile.bio || '';
  const contactInfo = buildContactInfo(profile);
  return {
    fullName, bio, contactInfo,
    profileReadme: formatProfileReadme(data.profileReadme),
    allRepos: formatAllRepos(data.allRepos),
    gists: formatGists(data.gists),
    activity: formatActivity(data.activity),
    stats: formatStats(profile),
    profile, rawRepos: data.allRepos, rawGists: data.gists,
  };
}

function formatProfileReadme(readme: string): SectionItem[] {
  if (!readme?.trim()) return [];
  const title = extractFirstHeading(readme);
  return [{ title, subtitle: '', description: readme, highlights: [], url: null, isHtml: false }];
}

function formatAllRepos(repos: GitHubRepo[]): SectionItem[] {
  if (!repos?.length) return [];
  return repos
    .filter(r => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || b.updated_at.localeCompare(a.updated_at))
    .slice(0, 20)
    .map((r: GitHubRepo) => {
      const highlights = [starCount(r.stargazers_count), r.language || ''].filter(Boolean).join(' ');
      return { title: r.name, subtitle: `Updated ${formatDate(r.updated_at)}`, description: r.description || '', highlights: highlights ? [highlights] : [], url: r.html_url, isHtml: false };
    });
}

function formatGists(gists: GitHubGist[]): SectionItem[] {
  if (!gists?.length) return [];
  return gists.slice(0, 10).map((g: GitHubGist) => {
    const fileNames = Object.keys(g.files || {});
    const subtitle = g.description?.trim() || (fileNames.length ? fileNames.join(', ') : '');
    const desc = `Updated ${formatDate(g.updated_at)}`;
    const highlights = [`Files: ${g.files ? Object.keys(g.files).length : 0}`, `Comments: ${g.comments}`];
    return { title: g.id, subtitle, description: desc, highlights, url: g.html_url, isHtml: false };
  });
}

function formatActivity(activity: GitHubActivity): SectionItem[] {
  if (!activity) return [];
  const items: SectionItem[] = [];
  (activity.recentCommits || []).slice(0, 5).forEach((c: GitHubCommit) => {
    const message = c.message?.split('\n')[0] || '';
    const truncated = message.length > 100 ? message.substring(0, 100) + '\u2026' : message;
    items.push({ title: truncated, subtitle: c.authorLogin || '', description: formatDate(c.committedDate), highlights: [], url: c.html_url, isHtml: false });
  });
  (activity.recentRepos || []).forEach((r: GitHubRepo) => {
    items.push({ title: r.name, subtitle: r.language || '', description: `Created: ${formatDate(r.updated_at)}`, highlights: [], url: r.html_url, isHtml: false });
  });
  return items;
}

function formatStats(profile: GitHubProfile): SectionItem[] {
  if (!profile) return [];
  const highlights = [`Repos: ${profile.public_repos}`, `Stars: ${profile.public_repos}`, `Followers: ${profile.followers}`, `Gists: ${profile.public_gists}`];
  return [{ title: 'Statistics', subtitle: `@${profile.login}`, description: `On GitHub since ${formatDate(profile.created_at)}`, highlights, url: null, isHtml: false }];
}
