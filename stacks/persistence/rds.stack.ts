import { StackContext, RDS } from 'sst/constructs';

export default function SQLDatabase({ stack }: StackContext): RDS {
  const rds = new RDS(stack, 'db', {
    engine: 'postgresql11.13',
    defaultDatabaseName: 'dbName',

  });

  return rds;
}
