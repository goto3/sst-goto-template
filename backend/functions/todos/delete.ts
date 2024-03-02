import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { ApiHandler } from 'sst/node/api';
import middy from '@middy/core';

import * as TodosService from '../../contexts/todos/services';
import { eventParser, errorHandler } from '../utils/middlewares';

const lambdaHandler = ApiHandler(async (event: APIGatewayProxyEventV2) => {
  const id = event.pathParameters?.id ?? '';
  await TodosService.remove(id);
});

export const handler = middy()
  .use(eventParser())
  .use(errorHandler())
  .handler(lambdaHandler);
