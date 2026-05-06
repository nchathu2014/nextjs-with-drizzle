import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
config({ path: ".env" });

const DATABASE_URL = process.env.DATABASE_URL!;
export const db = drizzle(DATABASE_URL);
