import { Schema, model, models } from 'mongoose';

export interface ITeam {
  name: string;
  mascot: string;
  coach: string;
  memberCount: number;
  weeklyMinutes: number;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    coach: { type: String, required: true },
    memberCount: { type: Number, required: true, min: 0 },
    weeklyMinutes: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const Team = models.Team || model<ITeam>('Team', teamSchema);
