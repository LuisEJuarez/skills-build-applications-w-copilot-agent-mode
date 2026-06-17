import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

interface TeamData {
  _id?: string;
  name: string;
  description: string;
  members?: Array<{ name: string; email?: string; role?: string }>;
  createdAt?: string;
}

const formatDate = (value?: string) => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString();
};

const Teams = () => {
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<TeamData>('teams', ['teams'])
      .then(setTeams)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading teams...</div>
      ) : teams.length === 0 ? (
        <div className="alert alert-secondary">No teams found.</div>
      ) : (
        <div className="row g-3">
          {teams.map((team) => (
            <article className="col-12 col-md-6" key={team._id ?? team.name}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">{team.name}</h3>
                  <p className="card-text">{team.description}</p>
                  <p className="card-text mb-1">
                    <strong>Members:</strong> {team.members?.length ?? 0}
                  </p>
                  <p className="card-text text-muted">Created: {formatDate(team.createdAt)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Teams;
