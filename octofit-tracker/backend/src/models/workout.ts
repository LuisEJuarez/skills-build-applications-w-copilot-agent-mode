import mongoose, { Document, Schema, model } from 'mongoose';

export interface WorkoutDocument extends Document {
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  muscleGroup: string;
  tags: string[];
  suggestedFor: string[];
  createdAt: Date;
}

const WorkoutSchema = new Schema<WorkoutDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true },
    muscleGroup: { type: String, required: true },
    tags: [{ type: String }],
    suggestedFor: [{ type: String }],
    createdAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export const Workout = model<WorkoutDocument>('Workout', WorkoutSchema);
