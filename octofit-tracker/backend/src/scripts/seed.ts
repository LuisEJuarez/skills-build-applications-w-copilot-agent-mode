import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.create([
    { name: 'Ava Johnson', email: 'ava.johnson@example.com', role: 'member' },
    { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'member' },
    { name: 'Mia Chen', email: 'mia.chen@example.com', role: 'captain' },
    { name: 'Liam Garcia', email: 'liam.garcia@example.com', role: 'member' },
  ]);

  const team = await Team.create({
    name: 'OctoRunners',
    description: 'A competitive team focused on daily running and cross-training.',
    members: users.map((user) => user._id),
  });

  await User.updateMany({ _id: { $in: users.map((user) => user._id) } }, { team: team._id });

  const activities = await Activity.create([
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

  const leaderboardEntries = await LeaderboardEntry.create([
    { user: users[2]._id, team: team._id, score: 1250, rank: 1 },
    { user: users[0]._id, team: team._id, score: 1100, rank: 2 },
    { user: users[1]._id, team: team._id, score: 980, rank: 3 },
    { user: users[3]._id, team: team._id, score: 940, rank: 4 },
  ]);

  const workouts = await Workout.create([
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

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

seed().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
