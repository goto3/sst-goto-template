import { ApiHandler } from 'sst/node/api';
import * as Users from '../../repository/users/users.repository';

export const handler = ApiHandler(async () => {
  const response = await Users.fetch();

  return {
    body: JSON.stringify(response, null, 2),
  };
});
