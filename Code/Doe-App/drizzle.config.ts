import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './db/schema.migration.ts',
  out: './drizzle',
  dialect: 'sqlite',
});

