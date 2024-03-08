import { ApiHandler } from 'sst/node/api';
import { runMigrations } from '../../services/postgres';

export const handler = ApiHandler(async () => {
  await runMigrations();

  return {
    body: 'Migrated!',
  };
});
