import { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';

export const API_PATH = '/api/activities/';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('activities', ['activities'])
      .then(setActivities)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (value) => {
    if (!value) return '—';
    return new Date(value).toLocaleDateString();
  };

  return (
    <section>
      <h2>Activities</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading activities...</div>
      ) : activities.length === 0 ? (
        <div className="alert alert-secondary">No activities found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? `${activity.type}-${activity.date}`}>
                  <td>{activity.type}</td>
                  <td>{typeof activity.user === 'object' ? activity.user.name : activity.user ?? '—'}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{formatDate(activity.date)}</td>
                  <td>{activity.notes ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Activities;
