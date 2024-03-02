/* eslint-disable max-len */
import DatabaseError from 'Repository/utils/errors/database.error';
import HttpError from './http-error';

interface ErrorFunction {
  (verb: string, resource: string): HttpError;
}

const ERRORS: Record<string, ErrorFunction> = {
  0: (verb: string, resource: string) => new HttpError(500, `${verb}.${resource}.DATABASE_ERROR`, 'Error while querying the database.'),
  23505: (verb: string, resource: string) => new HttpError(400, `${verb}.${resource}.DUPLICATE`, 'Already exists a Todo with that id'),
};

export const parseDatabaseError = (error: unknown, verb: string, resource: string) => {
  if (!(error instanceof DatabaseError)) return;

  const code = error.code || '0';
  throw ERRORS[code](verb, resource);
};

export default parseDatabaseError;
