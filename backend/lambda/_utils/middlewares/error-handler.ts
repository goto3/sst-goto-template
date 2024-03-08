import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import middy from '@middy/core';

import HttpError from '../../../_lib/errors/http-error';

export const errorHandler = (): middy.MiddlewareObj<APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2> => ({
  onError: async (request) => {
    const { context: { awsRequestId: requestId }, error } = request;
    console.error('❌ Error while running lambda function: ', error);

    request.response = error instanceof HttpError
      ? error.toAPIGatewayResult(requestId)
      : new HttpError(500).toAPIGatewayResult(requestId);
  },
});

export default errorHandler;
