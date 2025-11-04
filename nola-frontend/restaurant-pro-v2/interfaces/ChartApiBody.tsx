export interface ChartAPIBody {
  table: string;
  operation?: string;
  operationCol?: string;
  subColumns?: Array<string> | string;
  period?: string;
  dateColumn?: string;
  startDate?: string;
  endDate?: string;
  orderBy?: string;
  orderByCol?: string;
  groupBy?: string;
  groupByCol?: string;
}
