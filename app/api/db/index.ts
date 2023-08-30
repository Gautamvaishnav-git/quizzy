import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema/schema";

const client = new Client({
  connectionString: process.env.DATABASE_URI,
});

client.connect();

export const db = drizzle(client, { schema: schema });
