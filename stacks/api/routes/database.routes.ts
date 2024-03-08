import { Stack, Api, RDS } from 'sst/constructs';
import databaseParams from '../../utils/database-params';

export const databaseRoutes = (stack: Stack, api: Api, rds?: RDS) => (api.addRoutes(stack, {
  'POST /database/migrate': {
    function: {
      ...databaseParams(rds),
      timeout: 60,
      copyFiles: [
        {
          from: 'backend/infra/postgres/migrations',
          to: 'migrations',
        },
      ],
      handler: 'backend/lambda/database/migrate.handler',
    },
  },
}));

export default databaseRoutes;
