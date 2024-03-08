/* eslint-disable max-len */
import HttpError from './http-error';
import DatabaseError from '../../infra/repositories/_utils/errors/database.error';
import { HttpVerbs } from '../types/http-verbs.type';

interface ErrorFunction {
  (verb: string, resource: string): HttpError;
}

const ERRORS: Record<string, ErrorFunction> = {
  0: (verb: string, resource: string) => new HttpError(500, `${verb}.${resource}.DATABASE_ERROR`, 'Error while querying the database.'),
  23505: (verb: string, resource: string) => new HttpError(400, `${verb}.${resource}.DUPLICATE`, 'Already exists a Todo with that id'),
};

export const parseDatabaseError = (error: DatabaseError, verb: HttpVerbs, resource: string): Error => {
  const code = error.code || '0';
  return ERRORS[code](verb, resource);
};

export default parseDatabaseError;
