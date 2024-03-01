import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
  id: integer('id').primaryKey(),
  text: text('text'),
});

export default todos;
