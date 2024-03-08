import runPostgreSQLMigrations from '../../infra/repositories/database';

export const runMigrations = async (): Promise<void> => {
  await runPostgreSQLMigrations();
};

export default runMigrations;
