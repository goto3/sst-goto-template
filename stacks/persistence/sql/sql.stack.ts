import { StackContext, RDS } from 'sst/constructs';

const { DB_CONNECTION } = process.env;

export default function SQLDatabase({ stack }: StackContext): RDS | undefined {
  if (DB_CONNECTION && DB_CONNECTION !== '') return undefined;

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
