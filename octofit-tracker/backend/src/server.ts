import express from 'express';
import { connectDatabase } from './config/database';
import { User } from './models/user';
import { Team } from './models/team';
import { Activity } from './models/activity';
import { LeaderboardEntry } from './models/leaderboard';
import { Workout } from './models/workout';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const HOST = '0.0.0.0';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const CODESPACE_NAME = process.env.CODESPACE_NAME;

const getApiUrl = () => {
  if (CODESPACE_NAME) {
    return `https://${CODESPACE_NAME}-8000.app.github.dev`;
  }

  return `http://localhost:${PORT}`;
};

const asyncHandler = (fn: express.RequestHandler): express.RequestHandler => {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
};

app.use(express.json());

const usersRouter = express.Router();
usersRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const users = await User.find().lean();
    res.json({ users });
  })
);
usersRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
  })
);

const teamsRouter = express.Router();
teamsRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const teams = await Team.find().populate('members', 'name email role').lean();
    res.json({ teams });
  })
);
teamsRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  })
);

const activitiesRouter = express.Router();
activitiesRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const activities = await Activity.find()
      .populate('user', 'name email')
      .sort({ date: -1 })
      .lean();
    res.json({ activities });
  })
);
activitiesRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  })
);

const leaderboardRouter = express.Router();
leaderboardRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const leaderboard = await LeaderboardEntry.find()
      .populate('user', 'name role')
      .populate('team', 'name')
      .sort({ rank: 1 })
      .lean();
    res.json({ leaderboard });
  })
);

const workoutsRouter = express.Router();
workoutsRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const workouts = await Workout.find().lean();
    res.json({ workouts });
  })
);
workoutsRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  })
);

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker backend is running.',
    apiUrl: getApiUrl(),
  });
});

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, HOST, async () => {
  console.log(`Backend listening on ${getApiUrl()}`);

  try {
    await connectDatabase();
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
});
