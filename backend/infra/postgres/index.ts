/* eslint-disable import/no-mutable-exports */
import { RDSDataClient } from '@aws-sdk/client-rds-data';
import { Pool } from 'pg';
import { NodePgDatabase, drizzle as drizzlePostgres } from 'drizzle-orm/node-postgres';
import { AwsDataApiPgDatabase, drizzle as drizzleDataApi } from 'drizzle-orm/aws-data-api/pg';
import { RDS } from 'sst/node/rds';

const { DB_CONNECTION } = process.env;

let db: NodePgDatabase<Record<string, never>> | AwsDataApiPgDatabase<Record<string, never>>;

const dizzleLocal = () => {
  const pool = new Pool({
    connectionString: DB_CONNECTION,
  });
  return drizzlePostgres(pool, {
    logger: true,
  });
};

const dizzleRDS = () => {
  const rdsClient = new RDSDataClient({});
  return drizzleDataApi(rdsClient, {
    logger: true,
    database: RDS.db.defaultDatabaseName,
    secretArn: RDS.db.secretArn,
    resourceArn: RDS.db.clusterArn,
  });
};

(() => {
  const isLocal = DB_CONNECTION && DB_CONNECTION !== '';
  db = isLocal ? dizzleLocal() : dizzleRDS();
})();

export default db;
