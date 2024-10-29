import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, sql } from ".";

async function main() {
    await migrate(db, {
        migrationsFolder: "src/db//migrations",
    });

    await sql.end();
}

(async () => {
    await main();
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
