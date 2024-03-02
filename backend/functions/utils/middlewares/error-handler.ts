/* eslint-disable max-len */
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import middy from '@middy/core';
import { HttpError } from '../../../contexts/lib/errors/http-error';

const ERROR_500 = 'Oops! Something went wrong on our end. Please try again later. If the issue persists, contact support for assistance.';

export const errorHandler = (): middy.MiddlewareObj<APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2> => ({
  onError: async (request) => {
    const { context: { awsRequestId: requestId }, error } = request;
    console.error('❌ Error while running lambda function: ', error);

    if (error instanceof HttpError) {
      request.response = error.toAPIGatewayResult(requestId);
    } else {
      request.response = new HttpError(500, 'InternalServerError', ERROR_500).toAPIGatewayResult(requestId);
    }
  },
});

export default errorHandler;
