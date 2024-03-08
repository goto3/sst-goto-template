import runPostgreSQLMigrations from 'Repositories/database';

export const runMigrations = async (): Promise<void> => {
  await runPostgreSQLMigrations();
};

export default runMigrations;
