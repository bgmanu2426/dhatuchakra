import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    password: { type: String, required: true },
    accessToken: { type: String, default: null },
    refreshToken: { type: String, default: null },
  },
  { timestamps: true, collection: 'lca-tool' }
);

export const User: Model<IUser> = 
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
