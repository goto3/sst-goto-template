import { ApiHandler } from 'sst/node/api';
import middy from '@middy/core';

import * as TodosService from '../../contexts/todos/services';
import { eventParser, errorHandler, validator } from '../utils/middlewares';
import { schema as requestSchema, PatchEvent } from './schemas/request/patch.schema';
import { LambdaHandler } from '../utils/types/lambda-handler.type';

const lambdaHandler: LambdaHandler<PatchEvent> = async (event) => {
  const { body } = event;
  const data = {
    id: event.pathParameters?.id ?? '',
    text: body.text,
  };

  const updatedTodo = await TodosService.update(data);
  return updatedTodo;
};

export const handler = ApiHandler(middy()
  .use(eventParser())
  .use(errorHandler())
  .use(validator({
    input: { schema: requestSchema },
  }))
  .handler(lambdaHandler));
