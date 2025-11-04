import type { ChartAPIBody } from "./ChartApiBody";

export interface ChartProps {
  title: string;
  description: string;
  dataKey: string;
  label: string;
  chartData: Array<object>;
  color: string;
  endpoint: string;
  xAxis?: string;
  yAxis?: string;
  filters: ChartAPIBody;
}
