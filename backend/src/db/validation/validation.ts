import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { user } from '../schema/user.schema';
import { DI } from '../../dependency-injection';

export const selectUserZodSchema = createSelectSchema(user);
export const createUserZodSchema = createInsertSchema(user, {
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
}).transform(async (data) => {
  return {
    ...data,
    password: await DI.utils.PasswordHasher.hashPassword(data.password),
  };
});

export const loginZodSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});


export type CreateUser = z.infer<typeof createUserZodSchema>;
