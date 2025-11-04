import type { ChartAPIBody } from "../interfaces/ChartApiBody";

export async function fetchChartData(endpoint: string, body: ChartAPIBody) {
  const res = await fetch("http://godlevel-backend:8080" + endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Error fetching chart data.");

  return res.json();
}
