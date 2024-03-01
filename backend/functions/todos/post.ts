import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { ApiHandler } from 'sst/node/api';
import * as TodosService from '../../contexts/todos/services';

type RequestBody = {
  text: string;
};

export const handler = ApiHandler(async (event: APIGatewayProxyEventV2) => {
  const body = JSON.parse(event.body || '{}') as RequestBody;
  const data = body;
  try {
    const newTodo = await TodosService.create(data);
    return {
      statusCode: 200,
      body: JSON.stringify(newTodo),
    };
  } catch (err) {
    console.error('Error during operation', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error during operation' }),
    };
  }
});
