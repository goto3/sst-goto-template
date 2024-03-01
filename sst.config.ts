import { SSTConfig } from 'sst';

import SQLDatabase from '@stacks/persistence/sql-database.stack';
import API from '@stacks/api/api.stack';
import frontend from '@stacks/frontend/frontend.stack';

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config(_input) {
    return {
      name: 'sst-goto-template',
      profile: 'personal',
      region: 'us-east-2',
    };
  },
  stacks(app) {
    app.stack(SQLDatabase);
    app.stack(API);
    app.stack(frontend);
  },
} satisfies SSTConfig;
