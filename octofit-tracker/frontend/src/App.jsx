import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { apiHost, codespaceName } from './api.js';

const App = () => {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <header className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-4 pb-2 border-bottom">
          <div>
            <h1 className="h2 mb-1">OctoFit Tracker</h1>
            <p className="mb-0 text-muted">React 19 + Vite frontend for the OctoFit Tracker multi-tier app.</p>
          </div>
          <div className="text-end">
            <div className="fw-semibold">API host</div>
            <div className="small text-break">{apiHost}</div>
            <div className="small text-muted">{codespaceName ? 'Codespaces mode' : 'Local fallback'}</div>
          </div>
        </header>

        <nav className="nav nav-pills mb-4 flex-column flex-sm-row gap-2">
          <NavLink to="/activities" className="nav-link" end>
            Activities
          </NavLink>
          <NavLink to="/leaderboard" className="nav-link">
            Leaderboard
          </NavLink>
          <NavLink to="/teams" className="nav-link">
            Teams
          </NavLink>
          <NavLink to="/users" className="nav-link">
            Users
          </NavLink>
          <NavLink to="/workouts" className="nav-link">
            Workouts
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate replace to="/activities" />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route
            path="*"
            element={
              <div className="alert alert-warning">
                Page not found. Use the navigation links above to view tracker data.
              </div>
            }
          />
        </Routes>

        <footer className="mt-5 pt-4 border-top text-muted small">
          <p className="mb-1">
            Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for GitHub Codespaces API routing.
          </p>
          <p className="mb-0">When unset, the frontend safely falls back to <code>http://localhost:8000</code>.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
