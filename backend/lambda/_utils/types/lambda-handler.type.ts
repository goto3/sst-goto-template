import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

export type LambdaHandler<T> =
  (event: APIGatewayProxyEventV2 & T) => Promise<object | void | APIGatewayProxyStructuredResultV2>;
