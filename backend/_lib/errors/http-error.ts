/* eslint-disable max-len */
import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

import { HttpStatusCodes } from 'Types/http-status-codes.type';

const default500Error = {
  code: 'Internal Server Error',
  message: 'Oops! Something went wrong on our end. Please try again later. If the issue persists, contact support for assistance.',
};

export class HttpError extends Error {
  public statusCode: HttpStatusCodes;

  public code?: string;

  public constructor(statusCode: HttpStatusCodes, code?: string, message?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }

  public toAPIGatewayResult(requestId: string): APIGatewayProxyStructuredResultV2 {
    return {
      headers: { 'Content-Type': 'application/json' },
      statusCode: this.statusCode,
      body: JSON.stringify({
        code: this.code || default500Error.code,
        message: this.message || default500Error.message,
        requestId,
      }),
    };
  }
}

export default HttpError;
