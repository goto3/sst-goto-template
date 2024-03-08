import DatabaseError from 'Repositories/_utils/errors/database.error';
import HttpError from 'Errors/http-error';
import parseDatabaseError from 'Errors/parse-database-error';
import { HttpVerbs } from 'Types/http-verbs.type';

export const serviceWrapper = async <T>(verb: HttpVerbs, entity: string, fn: (...args: unknown[]) => Promise<T>) => {
  try {
    return await fn();
  } catch (error) {
    console.error(`Context ${entity} service error: `, error);
    if (error instanceof HttpError) throw error;
    if (error instanceof DatabaseError) throw parseDatabaseError(error, verb, entity);
    throw new HttpError(500, `${verb}.${entity}.SERVER_ERROR`, 'Server error while processing the request.');
  }
};

export default serviceWrapper;
