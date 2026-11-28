import type { GitHubProfile } from '../types/github';
import './StatsCard.css';

interface StatsCardProps {
  profile: GitHubProfile;
}

function formatDate(isoDate: string): string {
  if (!isoDate) return 'Unknown';
  try {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return 'Unknown';
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } catch {
    return 'Unknown';
  }
}

export default function StatsCard({ profile }: StatsCardProps) {
  return (
    <div className="adwaita-pref-group">
      <h2 className="adwaita-pref-group-title">Statistics</h2>
      <div className="adwaita-metrics-card">
        <div className="adwaita-metrics-row">
          <div className="adwaita-metric">
            <p className="adwaita-metric-value">{profile.public_repos}</p>
            <p className="adwaita-metric-label">Repos</p>
          </div>
          <div className="adwaita-metric">
            <p className="adwaita-metric-value">{profile.followers}</p>
            <p className="adwaita-metric-label">Followers</p>
          </div>
          <div className="adwaita-metric">
            <p className="adwaita-metric-value">{profile.following}</p>
            <p className="adwaita-metric-label">Following</p>
          </div>
          <div className="adwaita-metric">
            <p className="adwaita-metric-value">{profile.public_gists}</p>
            <p className="adwaita-metric-label">Gists</p>
          </div>
        </div>
        <p className="adwaita-bio" style={{ textAlign: 'center', marginTop: 16 }}>
          On GitHub since {formatDate(profile.created_at)}
        </p>
      </div>
    </div>
  );
}
