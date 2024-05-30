import mongoose, { Schema, model, Model } from 'mongoose';
import { IDbUser } from '../db-types';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      required: true,
      enum: ['client', 'admin', 'superadmin'],
    },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const User: Model<IDbUser> =
  mongoose.models.User || model<IDbUser>('User', userSchema);

export default User;
