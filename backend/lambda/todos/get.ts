/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiHandler } from 'sst/node/api';
import middy from '@middy/core';

import * as TodosService from '../../services/todos';
import { eventParser, errorHandler, logger } from '../_utils/middlewares';
import { LambdaHandler } from '../_utils/types/lambda-handler.type';

const lambdaHandler: LambdaHandler<unknown> = async (event) => {
  const todos = await TodosService.get();
  return { todos };
};

export const handler = ApiHandler(middy()
  .use(eventParser())
  .use(logger())
  .use(errorHandler())
  .handler(lambdaHandler));
