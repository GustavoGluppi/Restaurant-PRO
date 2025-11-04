import { Pool } from "pg";

// Connecting postgres with pooling method
const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
  ssl: false,
});

export default pool;
