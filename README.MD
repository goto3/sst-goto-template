Instructions:
- `pnpm install`
- Execute `pnpx sst secrets set <key> <value>` for each of the environment variables set in `./.env` Read more at: https://docs.sst.dev/packages/sst#sst-secrets
- edit ./sst.config.ts profile: "personal" set aws profile in .aws/credentials file
- `pnpm run dev`


Frontend:
- `cd /src/frontend`
- `pnpm install`
- `pnpm run dev`

Features:
- Postgres database TODO
- DynamoDB database TODO
- Next.js Site TODO
  - Amplify TODO
- Rest API TODO
- Auth TODO

Tech:
- STT 2
- pnpm
- typescript
- eslint
- Drizzle https://discord.com/channels/983865673656705025/1172383109157761074
- vitest
- middy
- Envirnment variables in SSM

Commands:
- Typescript typecheck: `npm run typecheck`
- Scan for eslint issues: `npm run lint`

TODOS:
env vars with config by enviroments


https://sst.dev/examples/how-to-add-google-login-to-your-sst-apps.html
Setup google authentication
https://console.cloud.google.com/apis/credentials
- Create project
- Credentials -> Create credentials -> OAuth Client ID
- CONFIGURE CONSENT SCREEN
- External
- Fill
  - App name: the name of your app, here we picked SST Auth
  - User support email: select your email address in the drop-down
  - Developer contact information: enter your email address again
- Save
- Credentials -> Create credentials -> OAuth Client ID
- Application type = Web application
- Create
- Save credentials (ClientID)
- CONFIGURE env var (TODO)
- Deploy app and grab API endpoint URL from Outputs -> ApiEndpoint
- Paste API endpoint URL in Google console Credentials -> the OAuth Client ID created
- Save

Recommended extensions:
- Vitest
- Error Lens
- ESLint

Connect to RDS Database with DBeaver PGAdmin, etc
Use https://github.com/sst/torpedo to connect to a database inside a private VPC
- Install torpedo
- Set environment variable `AWS_PROFILE=xxx torpedo`, replace xxx with aws profile name
- Connect to database localhost:5432


Generate migrations: read: https://github.com/drizzle-team/drizzle-kit-mirror
`cd backend/core && pnpm run migrate`