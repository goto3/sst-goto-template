/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiHandler } from 'sst/node/api';
import middy from '@middy/core';

import * as TodosService from '../../contexts/todos/services';
import { eventParser, errorHandler } from '../utils/middlewares';
import { LambdaHandler } from '../utils/types/lambda-handler.type';

const lambdaHandler: LambdaHandler<unknown> = async (event) => {
  const todos = await TodosService.get();
  return { todos };
};

export const handler = ApiHandler(middy()
  .use(eventParser())
  .use(errorHandler())
  .handler(lambdaHandler));
