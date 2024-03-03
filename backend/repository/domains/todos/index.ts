import { eq } from 'drizzle-orm';

import db from 'Repository/database';
import QueryWrapper from 'Repository/utils/query-wrapper';
import { todos, InsertTodo } from './todos.schema';

export const fetch = async () => QueryWrapper(
  db().select().from(todos),
);

export const insert = async (data: InsertTodo) => QueryWrapper(
  db().insert(todos).values(data).returning(),
);

export const update = async (data: InsertTodo) => QueryWrapper(
  db().update(todos).set(data).where(eq(todos.id, data.id as string))
    .returning(),
);

export const remove = async (id: string) => QueryWrapper(
  db().delete(todos).where(eq(todos.id, id)).returning(),
);
