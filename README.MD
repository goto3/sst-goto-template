Instructions:
- `pnpm install`
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
- Drizzle TODO
- vitest
- middy TODO
- dotenv? TODO

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