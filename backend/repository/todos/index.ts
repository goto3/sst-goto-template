import { eq } from 'drizzle-orm';
import { db } from '../database';
import { todos, InsertTodo, SelectTodo } from './todos.schema';

export const fetch = async (): Promise<SelectTodo[]> => {
  const response = await db.select().from(todos);

  return response;
};

export const insert = async (data: Omit<InsertTodo, 'id'>): Promise<SelectTodo> => {
  const response = await db.insert(todos).values({ text: data.text }).returning();

  return response[0];
};

export const update = async (data: InsertTodo): Promise<SelectTodo> => {
  const response = await db.update(todos).set(data).where(eq(todos.id, data.id as string)).returning();

  return response[0];
};

export const remove = async (id: string): Promise<string> => {
  const response = await db.delete(todos).where(eq(todos.id, id)).returning({ id: todos.id });

  return response[0].id;
};
