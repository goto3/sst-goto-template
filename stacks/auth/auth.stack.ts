import { StackContext, Auth, use } from 'sst/constructs';

import API from '../api/api.stack';

export default function Authenticator({ stack }: StackContext): Auth {
  const api = use(API);

  const auth = new Auth(stack, 'auth', {
    authenticator: {
      handler: 'backend/functions/auth/auth.handler',
    },
  });

  auth.attach(stack, {
    api,
    prefix: '/auth',
  });

  return auth;
}
