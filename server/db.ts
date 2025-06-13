import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { drizzle as drizzleBetter } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import ws from "ws";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

let db: any;

// Check if using SQLite (file:// protocol) or PostgreSQL
if (process.env.DATABASE_URL.startsWith('file:')) {
  // SQLite setup for local development
  const sqlite = new Database(process.env.DATABASE_URL.replace('file:', ''));
  db = drizzleBetter(sqlite, { schema });
} else {
  // PostgreSQL/Neon setup for production
  neonConfig.webSocketConstructor = ws;
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema });
}

export { db };
