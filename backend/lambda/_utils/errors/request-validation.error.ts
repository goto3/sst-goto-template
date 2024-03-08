import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import HttpError from 'Errors/http-error';

export class RequestValidationError extends HttpError {
  public details?: object;

  public constructor(details?: object) {
    super(400, 'Bad Request', 'Request validation failed');
    this.details = details;
  }

  public toAPIGatewayResult(requestId: string): APIGatewayProxyStructuredResultV2 {
    return {
      headers: { 'Content-Type': 'application/json' },
      statusCode: this.statusCode,
      body: JSON.stringify({
        code: this.code,
        message: this.message,
        details: this.details,
        requestId,
      }),
    };
  }
}

export default RequestValidationError;
