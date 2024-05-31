import { UpdateWriteOpResult } from 'mongoose';
import { connectDB } from '../database-config';
import User from '../models/User';
import { IDbUser } from '../db-types';

export interface IUserRepository {
  getUserByEmail(email: string): Promise<IDbUser | null>;
  updateUserPassword(
    userId: string,
    hashedPassword: string,
    isHashed: boolean,
  ): Promise<UpdateWriteOpResult>;
}

export class UserRepository {
  public async getUserByEmail(email: string): Promise<IDbUser | null> {
    await connectDB();
    return User.findOne({ email });
  }

  public async updateUserPassword(
    userId: string,
    hashedPassword: string,
    isHashed: boolean,
  ): Promise<UpdateWriteOpResult> {
    if (!isHashed) {
      throw new Error('Password is not hashed');
    }
    await connectDB();
    return User.updateOne({ _id: userId }, { password: hashedPassword });
  }
}
