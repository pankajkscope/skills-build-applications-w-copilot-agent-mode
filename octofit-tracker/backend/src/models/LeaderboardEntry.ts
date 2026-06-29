import { Schema, model, models } from 'mongoose';

export interface ILeaderboardEntry {
  rank: number;
  userName: string;
  teamName: string;
  points: number;
  streakDays: number;
}

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>(
  {
    rank: { type: Number, required: true, min: 1 },
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true, min: 0 },
    streakDays: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const LeaderboardEntry =
  models.LeaderboardEntry || model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
