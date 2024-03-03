import 'sst/node/rds';

declare module 'sst/node/rds' {
  export interface RDSResources {
    'db': {
      clusterArn: string;
      secretArn: string;
      defaultDatabaseName: string;
    }
  }
}
