import { RDS } from 'sst/constructs';
import LOCAL_DB_PARAMS from './get-local-db-params';

export const databaseParams = (rds?: RDS) => ({
  bind: rds && [rds],
  environment: {
    ...LOCAL_DB_PARAMS,
  },
});

export default databaseParams;
