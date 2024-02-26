import { StackContext, Api } from 'sst/constructs';

export default function API({ stack }: StackContext): Api {
  const api = new Api(stack, 'api', {
    routes: {
      'GET /todo': 'backend/functions/todos/get.handler',
      'POST /todo': 'backend/functions/todos/post.handler',
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return api;
}
