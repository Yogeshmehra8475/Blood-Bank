import { defineConfig } from 'drizzle-kit'

// Example config — do NOT commit secrets. Set DATABASE_URL in your env.
export default defineConfig({
  schema: './config/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || ''
  }
})
