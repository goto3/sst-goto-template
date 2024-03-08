import { migrate as mig } from 'drizzle-orm/postgres-js/migrator';
import db from '../../postgres';

export const runPostgreSQLMigrations = async (): Promise<void> => {
  // when running locally using pnpm run dev, the migrations are in a different location
  const pathToMigrations = process.env.IS_LOCAL
    ? 'backend/repository/database/migrations'
    : 'migrations';

  await mig(db, { migrationsFolder: pathToMigrations });
};

export default runPostgreSQLMigrations;
