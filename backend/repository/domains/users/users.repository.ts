import { eq } from 'drizzle-orm';
import { db } from '../../database';
import { users } from './users.schema';

export const fetch = async () => {
  const response = await db.select().from(users);

  return response;
};

export const remove = async (id: number) => {
  const response = await db.delete(users).where(eq(users.id, id)).returning();

  return response;
};
