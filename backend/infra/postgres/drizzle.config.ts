import type { Config } from 'drizzle-kit';

export default {
  schema: './postgres/schemas/*.schema.ts',
  out: './postgres/migrations',
} satisfies Config;
