import { Stack, Api, RDS } from 'sst/constructs';
import LOCAL_DB_PARAMS from '../../utils/get-local-db-params';

export const todosRoutes = (stack: Stack, api: Api, rds?: RDS) => (api.addRoutes(stack, {
  'GET /todo': {
    function: {
      bind: rds && [rds],
      environment: {
        ...LOCAL_DB_PARAMS,
      },
      handler: 'backend/functions/todos/get.handler',
    },
  },
  'POST /todo': {
    function: {
      bind: rds && [rds],
      environment: {
        ...LOCAL_DB_PARAMS,
      },
      handler: 'backend/functions/todos/post.handler',
    },
  },
  'PATCH /todo/{id}': {
    function: {
      bind: rds && [rds],
      environment: {
        ...LOCAL_DB_PARAMS,
      },
      handler: 'backend/functions/todos/patch.handler',
    },
  },
  'DELETE /todo/{id}': {
    function: {
      bind: rds && [rds],
      environment: {
        ...LOCAL_DB_PARAMS,
      },
      handler: 'backend/functions/todos/delete.handler',
    },
  },
}));

export default todosRoutes;
