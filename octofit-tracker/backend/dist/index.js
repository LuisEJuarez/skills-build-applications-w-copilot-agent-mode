"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const user_1 = require("./models/user");
const team_1 = require("./models/team");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const workout_1 = require("./models/workout");
const app = (0, express_1.default)();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const HOST = '0.0.0.0';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const getApiUrl = () => {
    if (CODESPACE_NAME) {
        return `https://${CODESPACE_NAME}-8000.githubpreview.dev`;
    }
    return `http://localhost:${PORT}`;
};
const asyncHandler = (fn) => {
    return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
};
app.use(express_1.default.json());
const usersRouter = express_1.default.Router();
usersRouter.get('/', asyncHandler(async (_req, res) => {
    const users = await user_1.User.find().lean();
    res.json({ users });
}));
usersRouter.post('/', asyncHandler(async (req, res) => {
    const user = await user_1.User.create(req.body);
    res.status(201).json(user);
}));
const teamsRouter = express_1.default.Router();
teamsRouter.get('/', asyncHandler(async (_req, res) => {
    const teams = await team_1.Team.find().populate('members', 'name email role').lean();
    res.json({ teams });
}));
teamsRouter.post('/', asyncHandler(async (req, res) => {
    const team = await team_1.Team.create(req.body);
    res.status(201).json(team);
}));
const activitiesRouter = express_1.default.Router();
activitiesRouter.get('/', asyncHandler(async (_req, res) => {
    const activities = await activity_1.Activity.find()
        .populate('user', 'name email')
        .sort({ date: -1 })
        .lean();
    res.json({ activities });
}));
activitiesRouter.post('/', asyncHandler(async (req, res) => {
    const activity = await activity_1.Activity.create(req.body);
    res.status(201).json(activity);
}));
const leaderboardRouter = express_1.default.Router();
leaderboardRouter.get('/', asyncHandler(async (_req, res) => {
    const leaderboard = await leaderboard_1.LeaderboardEntry.find()
        .populate('user', 'name role')
        .populate('team', 'name')
        .sort({ rank: 1 })
        .lean();
    res.json({ leaderboard });
}));
const workoutsRouter = express_1.default.Router();
workoutsRouter.get('/', asyncHandler(async (_req, res) => {
    const workouts = await workout_1.Workout.find().lean();
    res.json({ workouts });
}));
workoutsRouter.post('/', asyncHandler(async (req, res) => {
    const workout = await workout_1.Workout.create(req.body);
    res.status(201).json(workout);
}));
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
app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
});
app.listen(PORT, HOST, async () => {
    console.log(`Backend listening on ${getApiUrl()}`);
    try {
        await (0, database_1.connectDatabase)();
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
    }
});
