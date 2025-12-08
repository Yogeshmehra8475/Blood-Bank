import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js'
const sql = neon("postgresql://neondb_owner:npg_q9HF2JTvaioE@ep-sweet-mud-a4nnwh6i-pooler.us-east-1.aws.neon.tech/blood-donar?sslmode=require&channel_binding=require");
export const db = drizzle(sql,{schema});

