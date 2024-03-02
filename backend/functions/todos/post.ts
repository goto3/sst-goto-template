import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { ApiHandler } from 'sst/node/api';
import middy from '@middy/core';

import * as TodosService from '../../contexts/todos/services';
import { eventParser, errorHandler } from '../utils/middlewares';

type RequestBody = {
  text: string;
};

const lambdaHandler = ApiHandler(async (event: APIGatewayProxyEventV2) => {
  const body = event.body as unknown as RequestBody;
  const data = {
    text: body.text,
  };
  const newTodo = await TodosService.create(data);
  return newTodo as unknown as APIGatewayProxyStructuredResultV2;
});

export const handler = middy()
  .use(eventParser())
  .use(errorHandler())
  .handler(lambdaHandler);
