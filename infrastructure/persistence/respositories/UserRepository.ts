import User from '../models/User';
import { IDbUser } from '../db-types';
import { connectDB } from '../database-config';

export interface IUserRepository {
  getUserByEmail(email: string): Promise<IDbUser | null>;
}

export class UserRepository {
  public async getUserByEmail(email: string): Promise<IDbUser | null> {
    await connectDB();
    return User.findOne({ email });
  }
}
