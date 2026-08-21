import { defineConfig } from "drizzle-kit";

import "@/lib/env/load-env";
import { env } from "@/lib/env";

export default defineConfig({
    schema: "./lib/db/schema/*.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {url: env.DATABASE_URL}
});
