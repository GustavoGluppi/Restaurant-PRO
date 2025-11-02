import { Pool } from "pg";

// Connecting postgres with pooling method
const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

export default pool;
