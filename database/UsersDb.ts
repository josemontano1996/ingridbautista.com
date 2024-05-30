import bcrypt from 'bcryptjs';

import { IAuthUser } from '@/shared/interfaces/IAuthUser';
import User from '@/infrastructure/persistence/models/User';
import { connectDB } from '@/infrastructure/persistence/database-config';

export const loginUser = async (
  email: string,
  password: string,
): Promise<IAuthUser | null> => {
  if (!email || !password) {
    return null;
  }

  try {
    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password!);
    if (!passwordMatch) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role ? user.role : undefined,
    };
  } catch (error) {
    console.log('Error during login', error);
    return null;
  }
}
/* 
export const registerUser = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}): Promise<boolean> => {
  const hashedPassword = bcrypt.hashSync(password, 10);

  if (!email || !password || !name) {
    return null;
  }

  if (email.length < 5 || password.length < 8) {
    return false;
  }

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role: "client",
  });

  try {
    await dbConnect();
    const result = await user.save();

    if (!result) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    await dbDisconnect();
  }
}; */
