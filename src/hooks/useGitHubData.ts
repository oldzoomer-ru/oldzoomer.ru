import { useState, useEffect, useCallback } from 'react';
import { GitHubData } from '../types/github';
import { fetchAllGitHubData } from '../utils/githubApi';

interface UseGitHubDataReturn {
  data: GitHubData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGitHubData(): UseGitHubDataReturn {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchAllGitHubData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
