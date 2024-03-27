import { use, StackContext, StaticSite } from 'sst/constructs';

import API from '../api/api.stack';

export default function website({ stack }: StackContext) {
  const api = use(API);

  const web = new StaticSite(stack, 'web', {
    path: 'frontend/console',
    buildOutput: 'dist',
    buildCommand: 'vite build',
    environment: {
      VITE_APP_API_URL: api.url,
    },
  });

  return web;
}
