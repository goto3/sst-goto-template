import { RDSDataClient } from '@aws-sdk/client-rds-data';
import { Pool } from 'pg';
import { drizzle as drizzlePostgress } from 'drizzle-orm/node-postgres';
import { drizzle as drizzleDataApi } from 'drizzle-orm/aws-data-api/pg';
import { RDS } from 'sst/node/rds';

const { DB_CONNECTION } = process.env;

const dizzleLocal = () => {
  const pool = new Pool({
    connectionString: DB_CONNECTION,
  });
  return drizzlePostgress(pool);
};

const dizzleRDS = () => {
  const rdsClient = new RDSDataClient({});
  return drizzleDataApi(rdsClient, {
    database: RDS.db.defaultDatabaseName,
    secretArn: RDS.db.secretArn,
    resourceArn: RDS.db.clusterArn,
  });
};

const db = () => {
  const isLocal = DB_CONNECTION && DB_CONNECTION !== '';
  return isLocal ? dizzleLocal() : dizzleRDS();
};

export default db;
