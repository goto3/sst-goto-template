import { RDSDataClient } from '@aws-sdk/client-rds-data';
import { drizzle } from 'drizzle-orm/aws-data-api/pg';
import { RDS } from 'sst/node/rds';

const rdsClient = new RDSDataClient({});

export const db = drizzle(rdsClient, {
  database: RDS.db.defaultDatabaseName,
  secretArn: RDS.db.secretArn,
  resourceArn: RDS.db.clusterArn,
});

export default db;
