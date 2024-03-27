import { Stack, Api, use } from 'sst/constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import _ from 'lodash';

import SQLDatabase from '@stacks/persistence/sql/sql.stack';
import ElastiCache from '@stacks/cache/elasticache.stack';
import redisParams from '@stacks/utils/redis-params';
import databaseParams from '@stacks/utils/database-params';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';

export const todosRoutes = (stack: Stack, api: Api) => {
  const rds = use(SQLDatabase);
  const redis = use(ElastiCache);

  const bind = _.union(
    databaseParams(rds).bind,
    redisParams(redis).bind,
  );
  const environment = _.merge(databaseParams(rds).environment) as Record<string, string>;

  api.addRoutes(stack, {
    'GET /todo': {
      function: {
        vpc: redis.redisVPC,
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
        bind,
        environment,
        handler: 'backend/lambda/todos/get.handler',
      },
    },
    'POST /todo': {
      function: {
        vpc: redis.redisVPC,
        bind,
        environment,
        handler: 'backend/lambda/todos/post.handler',
      },
    },
    'PATCH /todo/{id}': {
      function: {
        vpc: redis.redisVPC,
        bind,
        environment,
        handler: 'backend/lambda/todos/patch.handler',
      },
    },
    'DELETE /todo/{id}': {
      function: {
        vpc: redis.redisVPC,
        bind,
        environment,
        handler: 'backend/lambda/todos/delete.handler',
      },
    },
  });

  api.getFunction('GET /todo')?.attachPermissions([new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ['elasticache:GetMetricStatistics', 'elasticache:DescribeCacheClusters'],
    resources: ['arn:aws:elasticache:us-east-2:483078141949:cluster:gt-dev-cluster'],
  })]);
};

export default todosRoutes;
