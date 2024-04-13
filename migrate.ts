import { migrate } from "drizzle-orm/postgres-js/migrator";

import { db } from "@/lib/drizzle/db";

function main() {
  migrate(db, { migrationsFolder: "./drizzle" });
}

main();
