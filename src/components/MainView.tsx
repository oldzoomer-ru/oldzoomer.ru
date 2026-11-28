import Header from './Header';
import Navigation from './Navigation';
import Sections from './Sections';
import StatsCard from './StatsCard';
import Loading from './Loading';
import Error from './Error';
import { useGitHubData } from '../hooks/useGitHubData';
import { toDisplayData } from '../utils/displayService';
import './MainView.css';

export default function MainView() {
  const { data, loading, error, refetch } = useGitHubData();

  if (loading) return <Loading message="Loading GitHub data..." />;
  if (error) return <Error message={error} onRetry={refetch} />;
  if (!data) return <Loading message="No data available" />;

  const displayData = toDisplayData(data);

  return (
    <div className="content-container">
      <Header fullName={displayData.fullName} />
      <Navigation />

      {/* Profile info */}
      <div className="adwaita-sub-header">
        {displayData.bio && <p className="adwaita-bio">{displayData.bio}</p>}
        {displayData.contactInfo && (
          <p className="adwaita-contacts">{displayData.contactInfo}</p>
        )}
      </div>

      <Sections title="About" items={displayData.profileReadme} />
      <Sections title="Activity" items={displayData.activity} />
      <StatsCard profile={data.profile} />
    </div>
  );
}
