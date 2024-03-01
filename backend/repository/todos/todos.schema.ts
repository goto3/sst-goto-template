import { pgTable, text } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const todos = pgTable('todos', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  text: text('text'),
});

export type InsertTodo = typeof todos.$inferInsert;
export type SelectTodo = typeof todos.$inferSelect;

export default todos;
