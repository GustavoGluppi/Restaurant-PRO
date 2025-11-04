import type { Request, Response } from "express";
import pool from "../db/index.js";
import redis from "../../redisclient.js";
import type { queryBody } from "../../interfaces/QueryBody.js";
import { stableStringify } from "../../utils/stableStringify.js";

const periodToDays = {
  "7days": 7,
  "30days": 30,
  "90days": 90,
  "360days": 360,
};

// Endpoint for query
export const queryTable = async (
  req: Request<{}, {}, queryBody>,
  res: Response
) => {
  const {
    table,
    operation,
    operationCol,
    subColumns,
    period,
    dateColumn,
    startDate,
    endDate,
    orderByCol,
    orderBy,
    groupBy,
    groupByCol,
  } = req.body;

  // Validations
  if (!(table || operation || subColumns))
    return res.status(500).json("Missing params.");

  if ((startDate || endDate) && period)
    return res.status(500).json("Select one way of date filter.");

  if (endDate && !startDate)
    return res.status(500).json("Please, send a valid start date.");

  if ((period || startDate || endDate) && !dateColumn)
    return res.status(500).json("Need a date subColumns to filter by period.");

  if (orderBy && !orderByCol) return res.status(500).json("Invalid Order By.");
  if (groupBy && !groupByCol) return res.status(500).json("Invalid Group By.");
  if (operation && !operationCol)
    return res.status(500).json("Invalid Operation.");
  if (groupBy && !operation)
    return res.status(500).json("Need a operation to use Group By.");

  if (groupBy && orderBy)
    return res
      .status(500)
      .json("Not allowed to use Group By and Order By in the same request.");

  if (!subColumns && !operation)
    return res.status(500).json("Need a column to return.");

  const validOperations = ["SUM", "AVG", "MAX", "MIN", "COUNT"];
  const validPeriods = ["7days", "30days", "90days", "360days"];
  const validGroupBy = ["month", "year"];

  if (operation && !validOperations.includes(operation))
    return res.status(500).json("Operation not allowed!");

  if (period && !validPeriods.includes(period))
    return res.status(500).json("Period not allowed!");

  if (groupBy && !validGroupBy.includes(groupBy))
    return res.status(500).json("Group By period not allowed!");

  const cacheKey = stableStringify(req.body);

  try {
    // Searching for Redis cache
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("Cached!");
      return res.status(200).json(JSON.parse(cached));
    }

    // Setting SELECT columns
    let queryString = "";

    let querySubColumns = Array.isArray(subColumns)
      ? subColumns.join(", ")
      : subColumns;

    if (!operation) {
      queryString = `SELECT ${querySubColumns} FROM ${table}`;
    } else {
      queryString = `SELECT ${operation}(${operationCol})${
        querySubColumns ? ", " + querySubColumns : ""
      } FROM ${table}`;
    }

    // Setting WHERE conditions

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

    // Setting Group By conditions
    if (groupBy) {
      switch (groupBy) {
        case "month":
          queryString =
            queryString.split("FROM")[0]?.trim() +
            `, to_char(${groupByCol}, 'Month') AS month ` +
            `, to_char(${groupByCol}, 'YYYY-MM') AS ymonth ` +
            "FROM " +
            queryString.split("FROM")[1]?.trim();
          queryString += ` GROUP BY month, ymonth`;
          queryString += ` ORDER BY ymonth`;
          break;
        case "year":
          queryString =
            queryString.split("FROM")[0]?.trim() +
            `, to_char(${groupByCol}, 'Year') AS year ` +
            "FROM " +
            queryString.split("FROM")[1]?.trim();
          queryString += ` GROUP BY year`;
          queryString += ` ORDER BY year`;
          break;
        default:
          break;
      }
    }

    // Setting Order By conditions
    if (orderByCol) {
      queryString += ` ORDER BY ${orderByCol} ${orderBy || ""}`;
    }

    // Adding a LIMIT to not consuming too much
    queryString += " LIMIT 150";

    const query = await pool.query(queryString);

    const result = query.rows;

    // Stores in cache for 5 minutes
    await redis.set(cacheKey, JSON.stringify(result), "EX", 5 * 60);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json("Erro ao consultar os dados.");
  }
};
