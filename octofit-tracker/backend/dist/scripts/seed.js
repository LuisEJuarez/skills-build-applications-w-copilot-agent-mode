"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(MONGODB_URI);
    console.log('Connected to MongoDB at', MONGODB_URI);
    await Promise.all([
        user_1.User.deleteMany({}),
        team_1.Team.deleteMany({}),
        activity_1.Activity.deleteMany({}),
        leaderboard_1.LeaderboardEntry.deleteMany({}),
        workout_1.Workout.deleteMany({}),
    ]);
    const users = await user_1.User.create([
        { name: 'Ava Johnson', email: 'ava.johnson@example.com', role: 'member' },
        { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'member' },
        { name: 'Mia Chen', email: 'mia.chen@example.com', role: 'captain' },
        { name: 'Liam Garcia', email: 'liam.garcia@example.com', role: 'member' },
    ]);
    const team = await team_1.Team.create({
        name: 'OctoRunners',
        description: 'A competitive team focused on daily running and cross-training.',
        members: users.map((user) => user._id),
    });
    await user_1.User.updateMany({ _id: { $in: users.map((user) => user._id) } }, { team: team._id });
    const activities = await activity_1.Activity.create([
        {
            user: users[0]._id,
            type: 'running',
            durationMinutes: 35,
            caloriesBurned: 420,
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
            notes: 'Morning tempo run with hill intervals.',
        },
        {
            user: users[1]._id,
            type: 'cycling',
            durationMinutes: 50,
            caloriesBurned: 520,
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
            notes: 'Endurance ride around the lake.',
        },
        {
            user: users[2]._id,
            type: 'strength training',
            durationMinutes: 40,
            caloriesBurned: 380,
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
            notes: 'Upper body circuit and core work.',
        },
    ]);
    const leaderboardEntries = await leaderboard_1.LeaderboardEntry.create([
        { user: users[2]._id, team: team._id, score: 1250, rank: 1 },
        { user: users[0]._id, team: team._id, score: 1100, rank: 2 },
        { user: users[1]._id, team: team._id, score: 980, rank: 3 },
        { user: users[3]._id, team: team._id, score: 940, rank: 4 },
    ]);
    const workouts = await workout_1.Workout.create([
        {
            title: 'Beginner Full-Body Strength',
            description: 'A balanced beginner workout focused on building strength and stability.',
            level: 'beginner',
            durationMinutes: 30,
            muscleGroup: 'full body',
            tags: ['strength', 'beginner', 'bodyweight'],
            suggestedFor: ['new members', 'recovery days'],
        },
        {
            title: 'Intermediate HIIT Circuit',
            description: 'A fast-paced interval workout designed to boost cardiovascular fitness.',
            level: 'intermediate',
            durationMinutes: 25,
            muscleGroup: 'cardio',
            tags: ['hiit', 'endurance', 'intervals'],
            suggestedFor: ['cardio training', 'fat burn'],
        },
        {
            title: 'Advanced Power Run',
            description: 'A challenging running workout with speed intervals and hill repeats.',
            level: 'advanced',
            durationMinutes: 45,
            muscleGroup: 'legs',
            tags: ['running', 'speed', 'strength'],
            suggestedFor: ['race prep', 'competitive athletes'],
        },
    ]);
    console.log('Seeded users:', users.length);
    console.log('Seeded team:', team.name);
    console.log('Seeded activities:', activities.length);
    console.log('Seeded leaderboard entries:', leaderboardEntries.length);
    console.log('Seeded workouts:', workouts.length);
    await mongoose_1.default.disconnect();
    console.log('Disconnected from MongoDB');
}
seed().catch((error) => {
    console.error('Seed script failed:', error);
    process.exit(1);
});
