import mongoose, { Document, Schema, Types, model } from 'mongoose';

export interface ActivityDocument extends Document {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
  notes?: string;
}

const ActivitySchema = new Schema<ActivityDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, default: () => new Date() },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Activity = model<ActivityDocument>('Activity', ActivitySchema);
