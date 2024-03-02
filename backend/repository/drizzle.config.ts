import type { Config } from 'drizzle-kit';

export default {
  schema: './domains/**/*.schema.ts',
  out: './database/migrations',
} satisfies Config;
