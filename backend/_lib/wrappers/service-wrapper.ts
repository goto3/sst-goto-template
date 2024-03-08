/* eslint-disable @typescript-eslint/no-explicit-any */
import DatabaseError from '../../infra/repositories/_utils/errors/database.error';
import HttpError from '../errors/http-error';
import parseDatabaseError from '../errors/parse-database-error';
import { HttpVerbs } from '../types/http-verbs.type';

export const serviceWrapper = async <T>(verb: HttpVerbs, entity: string, fn: (...args: any[]) => Promise<T>) => {
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
