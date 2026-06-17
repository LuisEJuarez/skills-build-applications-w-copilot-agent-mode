import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

interface LeaderboardEntryData {
  _id?: string;
  rank: number;
  score: number;
  user?: { name: string; role?: string } | string;
  team?: { name: string } | string;
  updatedAt?: string;
}

const formatDate = (value?: string) => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString();
};

const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntryData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<LeaderboardEntryData>('leaderboard', ['leaderboard', 'entries'])
      .then(setEntries)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading leaderboard...</div>
      ) : entries.length === 0 ? (
        <div className="alert alert-secondary">No leaderboard entries found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Score</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id ?? `${entry.rank}-${entry.score}`}>
                  <td>{entry.rank}</td>
                  <td>{typeof entry.user === 'object' ? entry.user.name : entry.user ?? '—'}</td>
                  <td>{typeof entry.team === 'object' ? entry.team.name : entry.team ?? '—'}</td>
                  <td>{entry.score}</td>
                  <td>{formatDate(entry.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Leaderboard;
