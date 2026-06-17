import mongoose, { Document, Schema, Types, model } from 'mongoose';

export interface LeaderboardEntryDocument extends Document {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  score: number;
  rank: number;
  updatedAt: Date;
}

const LeaderboardEntrySchema = new Schema<LeaderboardEntryDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, default: 1 },
    updatedAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export const LeaderboardEntry = model<LeaderboardEntryDocument>('LeaderboardEntry', LeaderboardEntrySchema);
