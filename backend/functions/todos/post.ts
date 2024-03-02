import { ApiHandler } from 'sst/node/api';
import middy from '@middy/core';

import * as TodosService from '../../contexts/todos/services';
import { eventParser, errorHandler, validator } from '../utils/middlewares';
import { schema as requestSchema, PostEvent } from './schemas/request/post.schema';
import { LambdaHandler } from '../utils/types/lambda-handler.type';

const lambdaHandler: LambdaHandler<PostEvent> = async (event) => {
  const { body } = event;
  const data = {
    text: body.text,
  };
  const newTodo = await TodosService.create(data);
  return newTodo;
};

export const handler = ApiHandler(middy()
  .use(eventParser())
  .use(errorHandler())
  .use(validator({
    input: { schema: requestSchema },
  }))
  .handler(lambdaHandler));
