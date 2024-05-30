import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from '@/shared/interfaces/IUser';

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

const User: Model<IUser> =
  mongoose.models.User || model<IUser>('User', userSchema);

export default User;
