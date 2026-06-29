import { Schema, model, models } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: 'member' | 'coach' | 'admin';
  teamName: string;
  weeklyGoalMinutes: number;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['member', 'coach', 'admin'], default: 'member' },
    teamName: { type: String, required: true },
    weeklyGoalMinutes: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const User = models.User || model<IUser>('User', userSchema);
