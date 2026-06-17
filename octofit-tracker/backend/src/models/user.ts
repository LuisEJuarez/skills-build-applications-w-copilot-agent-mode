import mongoose, { Document, Schema, Types, model } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  role: string;
  team?: Types.ObjectId;
  joinedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: 'member' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    joinedAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export const User = model<UserDocument>('User', UserSchema);
