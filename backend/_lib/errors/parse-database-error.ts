/* eslint-disable max-len */
import { HttpVerbs } from 'Types/http-verbs.type';
import DatabaseError from 'Repositories/_utils/errors/database.error';
import HttpError from './http-error';

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
