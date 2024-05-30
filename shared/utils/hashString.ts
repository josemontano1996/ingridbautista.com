import bcrypt from 'bcryptjs';

export const hashStringSync = (str: string): string => {
  return bcrypt.hashSync(str, 10);
};
