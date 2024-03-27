import { BindingResource } from 'sst/constructs/util/binding';
import LOCAL_DB_PARAMS from './get-local-db-params';

export const databaseParams = (rds?: BindingResource) => ({
  bind: rds && [rds],
  environment: {
    ...LOCAL_DB_PARAMS,
  },
});

export default databaseParams;
