import { Stack, Api } from 'sst/constructs';

const todosRoutes = (stack: Stack, api: Api) => {
  api.addRoutes(stack, {
    'GET /todo': 'backend/functions/todos/get.handler',
    'POST /todo': 'backend/functions/todos/post.handler',
  });
};

export default todosRoutes;
