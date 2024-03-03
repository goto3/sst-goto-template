import {
  StackContext, Api, use,
} from 'sst/constructs';

import SQLDatabase from '../persistence/sql-database.stack';
import * as routes from './routes';

export default function API({ stack }: StackContext): Api {
  const rds = use(SQLDatabase);

  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        // copy files from core migrations folder to a migrations folder that is bundled in the lambda
        copyFiles: [
          {
            from: 'backend/repository/database/migrations',
            to: 'migrations',
          },
        ],
      },
    },
  });

  // add routes
  Object.values(routes).forEach((route) => route(stack, api, rds));

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return api;
}
