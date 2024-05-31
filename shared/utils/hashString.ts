import bcrypt from 'bcryptjs';

export const hashStringSync = (str: string, salt?: string | number): string => {
  return bcrypt.hashSync(str, salt || 10);
};
