import Header from './Header';
import Navigation from './Navigation';
import Sections from './Sections';
import Loading from './Loading';
import Error from './Error';
import { useGitHubData } from '../hooks/useGitHubData';
import { toDisplayData } from '../utils/displayService';
import './ReposView.css';

export default function ReposView() {
  const { data, loading, error, refetch } = useGitHubData();

  if (loading) return <Loading message="Loading repositories..." />;
  if (error) return <Error message={error} onRetry={refetch} />;
  if (!data) return <Loading message="No data available" />;

  const displayData = toDisplayData(data);

  return (
    <div className="content-container">
      <Header fullName={displayData.fullName} />
      <Navigation />

      <Sections title="Repositories" items={displayData.allRepos} />
      <Sections title="Gists" items={displayData.gists} />
    </div>
  );
}
