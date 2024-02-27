import { AuthHandler, GoogleAdapter } from 'sst/node/auth';

const GOOGLE_CLIENT_ID = '919259073715-86c338ag52vsvl2fiidmf39qsgivim46.apps.googleusercontent.com';

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: 'oidc',
      clientID: GOOGLE_CLIENT_ID,
      onSuccess: async (tokenset) => ({
        statusCode: 200,
        body: JSON.stringify(tokenset.claims(), null, 4),
      }),
    }),
  },
});
