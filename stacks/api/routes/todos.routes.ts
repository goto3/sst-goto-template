import { Stack, Api, RDS } from 'sst/constructs';
import _ from 'lodash';
import databaseParams from '../../utils/database-params';

export const todosRoutes = (stack: Stack, api: Api, rds?: RDS) => (api.addRoutes(stack, {
  'GET /todo': {
    function: {
      bind: _.union(databaseParams(rds).bind),
      environment: _.merge(databaseParams(rds).environment) as Record<string, string>,
      handler: 'backend/lambda/todos/get.handler',
    },
  },
  'POST /todo': {
    function: {
      bind: _.union(databaseParams(rds).bind),
      environment: _.merge(databaseParams(rds).environment) as Record<string, string>,
      handler: 'backend/lambda/todos/post.handler',
    },
  },
  'PATCH /todo/{id}': {
    function: {
      bind: _.union(databaseParams(rds).bind),
      environment: _.merge(databaseParams(rds).environment) as Record<string, string>,
      handler: 'backend/lambda/todos/patch.handler',
    },
  },
  'DELETE /todo/{id}': {
    function: {
      bind: _.union(databaseParams(rds).bind),
      environment: _.merge(databaseParams(rds).environment) as Record<string, string>,
      handler: 'backend/lambda/todos/delete.handler',
    },
  },
}));

export default todosRoutes;
