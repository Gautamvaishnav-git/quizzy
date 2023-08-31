import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema/schema";

if (!process.env.DATABASE_URI) {
  throw new Error("Missing environment variable: DATABASE_URI");
}

const client = new Client({
  connectionString: process.env.DATABASE_URI,
});

client.connect();

export const db = drizzle(client, { schema: schema });
