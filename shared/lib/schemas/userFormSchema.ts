import { z } from 'zod';

export const userFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
});

export const updatePasswordFormSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});
