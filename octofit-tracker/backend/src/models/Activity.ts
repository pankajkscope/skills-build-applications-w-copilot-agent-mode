import { Schema, model, models } from 'mongoose';

export interface IActivity {
  userName: string;
  teamName: string;
  type: 'run' | 'cycle' | 'strength' | 'yoga' | 'swim';
  durationMinutes: number;
  caloriesBurned: number;
  completedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    type: { type: String, enum: ['run', 'cycle', 'strength', 'yoga', 'swim'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Activity = models.Activity || model<IActivity>('Activity', activitySchema);
