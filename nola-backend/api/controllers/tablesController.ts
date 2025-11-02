import type { Request, Response } from "express";
import pool from "../db/index.js";

// Endpoint for retrieving tables from database
export const getTables = async (req: Request, res: Response) => {
  const query = await pool.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'"
  );

  const tables = query.rows.map((el) => el.table_name);

  res.status(200).json(tables);
};

// Endpoint for retrieving table columns and data types
export const getCols = async (req: Request, res: Response) => {
  const { table } = req.params;

  const query = await pool.query(
    `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${table}'`
  );

  res.status(200).json(query.rows);
};
