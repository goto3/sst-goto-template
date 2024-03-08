import { ApiHandler } from 'sst/node/api';
import middy from '@middy/core';

import * as TodosService from 'Services/todos';
import {
  eventParser, errorHandler, validator, logger,
} from '../_utils/middlewares';
import { schema as requestSchema, PatchEvent } from './schemas/request/patch.schema';
import { LambdaHandler } from '../_utils/types/lambda-handler.type';

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
  .use(logger())
  .use(errorHandler())
  .use(validator({
    input: { schema: requestSchema },
  }))
  .handler(lambdaHandler));
