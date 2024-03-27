import { StackContext, RDS } from 'sst/constructs';

const { LOCAL_DB_CONNECTION } = process.env;

export default function SQLDatabase({ stack }: StackContext): RDS | undefined {
  if (LOCAL_DB_CONNECTION || LOCAL_DB_CONNECTION !== '') return undefined;

  const rds = new RDS(stack, 'db', {
    engine: 'postgresql11.13',
    defaultDatabaseName: 'dbName',
  });

  stack.addOutputs({
    resourceArn: rds.clusterArn,
    secretArn: rds.secretArn,
    database: rds.defaultDatabaseName,
  });

  return rds;
}
