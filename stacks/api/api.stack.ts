import { StackContext, Api } from 'sst/constructs';
import todosRoutes from './todos';

export default function API({ stack }: StackContext): Api {
  const api = new Api(stack, 'api', {
  });

  todosRoutes(stack, api);

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return api;
}
