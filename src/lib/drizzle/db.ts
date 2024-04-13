import "@/lib/loadEnv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
// import { migrate } from "drizzle-orm/postgres-js/migrator";

import * as schema from "./schema";

const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle(client, { schema });

// migrate(db, { migrationsFolder: "./drizzle" });
