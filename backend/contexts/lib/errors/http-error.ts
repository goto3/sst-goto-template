import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

import { StatusCodes } from '../types/status-codes.type';

export class HttpError extends Error {
  public statusCode: StatusCodes;

  public code: string;

  public constructor(statusCode: StatusCodes, code: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }

  public toAPIGatewayResult(requestId: string): APIGatewayProxyStructuredResultV2 {
    return {
      headers: { 'Content-Type': 'application/json' },
      statusCode: this.statusCode,
      body: JSON.stringify({
        code: this.code,
        message: this.message,
        requestId,
      }),
    };
  }
}

export default HttpError;
