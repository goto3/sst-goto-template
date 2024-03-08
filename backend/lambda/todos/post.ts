import { ApiHandler } from 'sst/node/api';
import middy from '@middy/core';

import * as TodosService from '../../services/todos';
import {
  eventParser, errorHandler, validator, logger,
} from '../_utils/middlewares';
import { schema as requestSchema, PostEvent } from './schemas/request/post.schema';
import { LambdaHandler } from '../_utils/types/lambda-handler.type';

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
  .use(logger())
  .use(errorHandler())
  .use(validator({
    input: { schema: requestSchema },
  }))
  .handler(lambdaHandler));
