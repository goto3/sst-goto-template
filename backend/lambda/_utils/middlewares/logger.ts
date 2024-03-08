import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import middy from '@middy/core';
import _ from 'lodash';

const requestKeysToOmit = [
  'event.version',
  'event.rawPath',
  'event.headers.accept',
  'event.headers.accept-encoding',
  'event.headers.content-length',
  'event.headers.host',
  'event.headers.postman-token',
  'event.headers.user-agent',
  'event.requestContext',
  'event.isBase64Encoded',
  'context.getRemainingTimeInMillis',
  'context.identity',
  'context.clientContext',
  'context.functionVersion',
  'context.memoryLimitInMB',
  'context.done',
  'context.fail',
  'context.succeed',
  'response',
  'error',
  'internal',
];

export const logger = (): middy.MiddlewareObj<APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2> => ({
  before: async (request) => {
    const input = _.omit(request, requestKeysToOmit);
    console.info('🚀 Incoming Request: ', input);
  },

  after: async (request) => {
    console.info('✅ Outgoing Response: ', request.response);
  },
});

export default logger;
