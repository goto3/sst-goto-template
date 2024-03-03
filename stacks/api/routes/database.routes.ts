import { Stack, Api, RDS } from 'sst/constructs';
import LOCAL_DB_PARAMS from '../../utils/get-local-db-params';

export const databaseRoutes = (stack: Stack, api: Api, rds?: RDS) => (api.addRoutes(stack, {
  'GET /database/users': {
    function: {
      bind: rds && [rds],
      environment: {
        ...LOCAL_DB_PARAMS,
      },
      handler: 'backend/functions/users/get.handler',
    },
  },
  'POST /database/migrate': {
    function: {
      bind: rds && [rds],
      environment: {
        ...LOCAL_DB_PARAMS,
      },
      handler: 'backend/functions/database/migrate.handler',
    },
  },
}));

export default databaseRoutes;
