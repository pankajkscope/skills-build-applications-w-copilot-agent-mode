import mongoose from 'mongoose';
import { MONGODB_URI } from '../config';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGODB_URI);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  await Team.insertMany([
    {
      name: 'Octo Climbers',
      mascot: 'Summit Kraken',
      coach: 'Mina Torres',
      memberCount: 4,
      weeklyMinutes: 1180,
    },
    {
      name: 'Branch Blazers',
      mascot: 'Fire Fern',
      coach: 'Eli Morgan',
      memberCount: 3,
      weeklyMinutes: 920,
    },
    {
      name: 'Merge Mavericks',
      mascot: 'Trail Lynx',
      coach: 'Priya Shah',
      memberCount: 3,
      weeklyMinutes: 760,
    },
  ]);

  await User.insertMany([
    {
      name: 'Avery Chen',
      email: 'avery.chen@example.com',
      role: 'member',
      teamName: 'Octo Climbers',
      weeklyGoalMinutes: 300,
    },
    {
      name: 'Jordan Lee',
      email: 'jordan.lee@example.com',
      role: 'coach',
      teamName: 'Branch Blazers',
      weeklyGoalMinutes: 240,
    },
    {
      name: 'Sam Rivera',
      email: 'sam.rivera@example.com',
      role: 'member',
      teamName: 'Merge Mavericks',
      weeklyGoalMinutes: 210,
    },
    {
      name: 'Taylor Brooks',
      email: 'taylor.brooks@example.com',
      role: 'admin',
      teamName: 'Octo Climbers',
      weeklyGoalMinutes: 360,
    },
  ]);

  await Activity.insertMany([
    {
      userName: 'Avery Chen',
      teamName: 'Octo Climbers',
      type: 'run',
      durationMinutes: 45,
      caloriesBurned: 430,
      completedAt: new Date('2026-06-27T13:30:00Z'),
    },
    {
      userName: 'Jordan Lee',
      teamName: 'Branch Blazers',
      type: 'cycle',
      durationMinutes: 60,
      caloriesBurned: 520,
      completedAt: new Date('2026-06-28T16:15:00Z'),
    },
    {
      userName: 'Sam Rivera',
      teamName: 'Merge Mavericks',
      type: 'strength',
      durationMinutes: 40,
      caloriesBurned: 310,
      completedAt: new Date('2026-06-29T09:00:00Z'),
    },
    {
      userName: 'Taylor Brooks',
      teamName: 'Octo Climbers',
      type: 'yoga',
      durationMinutes: 35,
      caloriesBurned: 180,
      completedAt: new Date('2026-06-29T11:45:00Z'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    {
      rank: 1,
      userName: 'Taylor Brooks',
      teamName: 'Octo Climbers',
      points: 1840,
      streakDays: 18,
    },
    {
      rank: 2,
      userName: 'Avery Chen',
      teamName: 'Octo Climbers',
      points: 1715,
      streakDays: 14,
    },
    {
      rank: 3,
      userName: 'Jordan Lee',
      teamName: 'Branch Blazers',
      points: 1580,
      streakDays: 11,
    },
    {
      rank: 4,
      userName: 'Sam Rivera',
      teamName: 'Merge Mavericks',
      points: 1425,
      streakDays: 9,
    },
  ]);

  await Workout.insertMany([
    {
      title: 'Morning Momentum Run',
      focus: 'cardio',
      difficulty: 'beginner',
      durationMinutes: 25,
      suggestedFor: 'Members building a consistent cardio base',
    },
    {
      title: 'Core Strength Circuit',
      focus: 'strength',
      difficulty: 'intermediate',
      durationMinutes: 35,
      suggestedFor: 'Athletes improving full-body control',
    },
    {
      title: 'Desk Reset Mobility',
      focus: 'mobility',
      difficulty: 'beginner',
      durationMinutes: 15,
      suggestedFor: 'Remote workers needing shoulder and hip mobility',
    },
    {
      title: 'Peak Push Intervals',
      focus: 'cardio',
      difficulty: 'advanced',
      durationMinutes: 45,
      suggestedFor: 'Leaderboard competitors training high-intensity endurance',
    },
  ]);

  console.log('Seed data inserted successfully');
}

seedDatabase()
  .catch((error) => {
    console.error('Failed to seed octofit_db:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
