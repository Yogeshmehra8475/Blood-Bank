import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './config/schema.js',
    out: './drizzle',
    dialect:'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:npg_q9HF2JTvaioE@ep-sweet-mud-a4nnwh6i-pooler.us-east-1.aws.neon.tech/blood-donar?sslmode=require&channel_binding=require'
    }
})