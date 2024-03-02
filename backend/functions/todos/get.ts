/* eslint-disable @typescript-eslint/no-unused-vars */
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { ApiHandler } from 'sst/node/api';
import middy from '@middy/core';

import * as TodosService from '../../contexts/todos/services';
import { eventParser, errorHandler } from '../utils/middlewares';

const lambdaHandler = ApiHandler(async (event: APIGatewayProxyEventV2) => {
  const todos = await TodosService.get();
  return { todos } as unknown as APIGatewayProxyStructuredResultV2;
});

export const handler = middy()
  .use(eventParser())
  .use(errorHandler())
  .handler(lambdaHandler);
