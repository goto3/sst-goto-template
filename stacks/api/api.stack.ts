import {
  StackContext, Api, use,
} from 'sst/constructs';

import SQLDatabase from '../persistence/sql/sql.stack';
import * as routes from './routes';

export default function API({ stack }: StackContext): Api {
  const rds = use(SQLDatabase);

  const api = new Api(stack, 'api', {

  });

  // add routes
  Object.values(routes).forEach((route) => route(stack, api, rds));

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return api;
}
