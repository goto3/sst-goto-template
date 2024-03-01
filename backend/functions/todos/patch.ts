import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { ApiHandler } from 'sst/node/api';

export const handler = ApiHandler(async (event: APIGatewayProxyEventV2) => ({
  statusCode: 200,
  body: event.requestContext.time,
}));
