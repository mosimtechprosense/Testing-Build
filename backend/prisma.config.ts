import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/bookmybanquets/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
