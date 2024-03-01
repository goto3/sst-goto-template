import { Stack, Api } from 'sst/constructs';

export const databaseRoutes = (stack: Stack, api: Api) => (api.addRoutes(stack, {
  'GET /database/users': 'backend/functions/users/get.handler',
  'POST /database/migrate': 'backend/functions/database/migrate.handler',
}));

export default databaseRoutes;
