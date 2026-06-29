import { Schema, model, models } from 'mongoose';

export interface IWorkout {
  title: string;
  focus: 'cardio' | 'strength' | 'mobility' | 'recovery';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  suggestedFor: string;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    focus: { type: String, enum: ['cardio', 'strength', 'mobility', 'recovery'], required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    suggestedFor: { type: String, required: true },
  },
  { timestamps: true }
);

export const Workout = models.Workout || model<IWorkout>('Workout', workoutSchema);
