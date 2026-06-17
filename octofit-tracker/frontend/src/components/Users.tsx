import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

interface UserData {
  _id?: string;
  name: string;
  email: string;
  role: string;
  team?: { name: string } | string;
  joinedAt?: string;
}

const formatDate = (value?: string) => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString();
};

const Users = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<UserData>('users', ['users'])
      .then(setUsers)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading users...</div>
      ) : users.length === 0 ? (
        <div className="alert alert-secondary">No users found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Team</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id ?? `${user.email}-${user.name}`}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{typeof user.team === 'object' ? user.team.name : user.team ?? '—'}</td>
                  <td>{formatDate(user.joinedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Users;
