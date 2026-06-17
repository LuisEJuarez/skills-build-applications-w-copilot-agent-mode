import mongoose, { Document, Schema, Types, model } from 'mongoose';

export interface TeamDocument extends Document {
  name: string;
  description: string;
  members: Types.ObjectId[];
  createdAt: Date;
}

const TeamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export const Team = model<TeamDocument>('Team', TeamSchema);
