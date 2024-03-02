import { ApiHandler } from 'sst/node/api';
import middy from '@middy/core';

import * as TodosService from '../../contexts/todos/services';
import { eventParser, errorHandler, validator } from '../utils/middlewares';
import { schema as requestSchema, DeleteEvent } from './schemas/request/delete.schema';
import { LambdaHandler } from '../utils/types/lambda-handler.type';

const lambdaHandler: LambdaHandler<DeleteEvent> = async (event) => {
  const id = event.pathParameters?.id ?? '';
  await TodosService.remove(id);
};

export const handler = ApiHandler(middy()
  .use(eventParser())
  .use(errorHandler())
  .use(validator({
    input: { schema: requestSchema },
  }))
  .handler(lambdaHandler));
