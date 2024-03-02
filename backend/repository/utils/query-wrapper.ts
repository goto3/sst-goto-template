import DatabaseError from './errors/database.error';
import extractSqlState from './extract-sqlstate';

export default async function QueryWrapper<T>(
  prom: Promise<T>,
): Promise<T | null> {
  try {
    return await prom;
  } catch (error) {
    console.error('Database error: ', error);
    throw new DatabaseError((error as Error).message, extractSqlState(error as Error));
  }
}
