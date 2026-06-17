import { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';

export const API_PATH = '/api/workouts/';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('workouts', ['workouts'])
      .then(setWorkouts)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (value) => {
    if (!value) return '—';
    return new Date(value).toLocaleDateString();
  };

  return (
    <section>
      <h2>Workouts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading workouts...</div>
      ) : workouts.length === 0 ? (
        <div className="alert alert-secondary">No workouts found.</div>
      ) : (
        <div className="row g-3">
          {workouts.map((workout) => (
            <article className="col-12 col-md-6" key={workout._id ?? workout.title}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">{workout.title}</h3>
                  <p className="card-text">{workout.description}</p>
                  <p className="card-text mb-1">
                    <strong>Level:</strong> {workout.level}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Duration:</strong> {workout.durationMinutes} min
                  </p>
                  <p className="card-text mb-1">
                    <strong>Muscle group:</strong> {workout.muscleGroup}</p>
                  <p className="card-text text-muted">Created: {formatDate(workout.createdAt)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Workouts;
