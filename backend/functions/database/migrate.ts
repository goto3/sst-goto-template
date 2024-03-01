import { runMigrations } from 'repository/database/services/migrate';
import { ApiHandler } from 'sst/node/api';

export const handler = ApiHandler(async () => {
  await runMigrations();

  return {
    body: 'Migrated!',
  };
});
