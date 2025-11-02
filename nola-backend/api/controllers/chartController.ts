import type { Request, Response } from "express";
import pool from "../db/index.js";

interface queryBody {
  table: string;
  operation: string | null;
  columns: Array<string> | string;
  period?: string;
  dateColumn?: string;
  startDate?: string;
  endDate?: string;
  orderBy?: string;
  orderByCol?: string;
}

const periodToDays = {
  "7days": 7,
  "30days": 30,
  "90days": 90,
  "360days": 360,
};

// Endpoint for
export const queryTable = async (
  req: Request<{}, {}, queryBody>,
  res: Response
) => {
  const {
    table,
    operation,
    columns,
    period,
    dateColumn,
    startDate,
    endDate,
    orderByCol,
    orderBy,
  } = req.body;

  if (!(table || operation || columns))
    return res.status(500).json("Missing params.");

  if ((startDate || endDate) && period)
    return res.status(500).json("Select one way of date filter.");

  if (endDate && !startDate)
    return res.status(500).json("Please, send a valid start date.");

  if ((period || startDate || endDate) && !dateColumn)
    return res.status(500).json("Need a date columns to filter by period.");

  if (orderBy && !orderByCol) return res.status(500).json("Invalid order by.");

  const validOperations = ["SUM", "AVG", "MAX", "MIN", "COUNT"];
  const validPeriods = ["7days", "30days", "90days", "360days"];

  if (operation && !validOperations.includes(operation))
    return res.status(500).json("Operation not allowed!");

  if (period && !validPeriods.includes(period))
    return res.status(500).json("Period not allowed!");

  let queryString = "";
  const queryColumns = Array.isArray(columns) ? columns.join(", ") : columns;

  if (!operation) {
    queryString = `SELECT ${columns} FROM ${table}`;
  } else {
    queryString = `SELECT ${operation}(${columns}) FROM ${table}`;
  }

  if (period || startDate) {
    const queryEndDate = endDate || new Date().toLocaleDateString("en");

    const days = periodToDays[period as keyof typeof periodToDays];
    const queryStartDate =
      startDate ||
      new Date(
        new Date().getTime() - days * 24 * 60 * 60 * 1000
      ).toLocaleDateString("en");

    queryString += ` WHERE ${dateColumn} >= '${queryStartDate}' AND ${dateColumn} <= '${queryEndDate}'`;
  }

  if (orderByCol) {
    queryString += ` ORDER BY ${orderByCol} ${orderBy || ""}`;
  }

  queryString += " LIMIT 150";

  console.log(queryString);

  const query = await pool.query(queryString);

  const result = query.rows;

  res.status(200).json(result);
};
