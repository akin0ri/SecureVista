import type { Config } from "drizzle-kit";

export default {
  schema: "./schema.ts",
  out: "./drizzle/migrations",
  driver: "d1-http",
  dialect: "sqlite",
  dbCredentials: {
    wranglerConfigPath: "wrangler.toml",
    dbName: "securevista-app-db",
  },
} satisfies Config;