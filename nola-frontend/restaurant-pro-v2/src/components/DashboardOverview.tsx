import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  Pencil,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartProps } from "../../interfaces/ChartProps";
import { fetchChartData } from "../../services/chart-api";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const stats = [
  {
    title: "Total Revenue",
    value: "$12,426",
    change: "+12.5%",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Orders Today",
    value: "48",
    change: "+8.2%",
    icon: ShoppingBag,
    trend: "up",
  },
  {
    title: "Customers",
    value: "1,248",
    change: "+15.3%",
    icon: Users,
    trend: "up",
  },
  {
    title: "Average Order",
    value: "$42.50",
    change: "+3.1%",
    icon: TrendingUp,
    trend: "up",
  },
];

const ordersData = [
  { name: "Mon", orders: 32 },
  { name: "Tue", orders: 45 },
  { name: "Wed", orders: 38 },
  { name: "Thu", orders: 52 },
  { name: "Fri", orders: 68 },
  { name: "Sat", orders: 72 },
  { name: "Sun", orders: 58 },
];

const recentOrders = [
  {
    id: "#1234",
    customer: "John Doe",
    items: "2x Burger, 1x Fries",
    total: "$28.50",
    status: "Completed",
    time: "10 mins ago",
  },
  {
    id: "#1235",
    customer: "Jane Smith",
    items: "1x Pasta, 2x Salad",
    total: "$42.00",
    status: "Preparing",
    time: "15 mins ago",
  },
  {
    id: "#1236",
    customer: "Mike Johnson",
    items: "3x Pizza, 1x Soda",
    total: "$65.00",
    status: "Delivered",
    time: "25 mins ago",
  },
  {
    id: "#1237",
    customer: "Sarah Williams",
    items: "1x Steak, 1x Wine",
    total: "$85.50",
    status: "Completed",
    time: "30 mins ago",
  },
  {
    id: "#1238",
    customer: "Tom Brown",
    items: "2x Sandwich",
    total: "$18.00",
    status: "Pending",
    time: "35 mins ago",
  },
];

export function DashboardOverview() {
  const [charts, setCharts] = useState<Record<string, ChartProps>>({
    "1": {
      title: "Example Chart",
      chartData: [],
      dataKey: "",
      description: "",
      color: "#f97316",
      label: "",
      endpoint: "/api/chart",
      xAxis: "month",
      yAxis: "sum",
      filters: {
        table: "sales",
        operation: "SUM",
        operationCol: "value_paid",
        dateColumn: "created_at",
        groupBy: "month",
        groupByCol: "created_at",
        period: "360days",
      },
    },
  });

  const fetchAllCharts = async () => {
    const entries = await Promise.all(
      Object.entries(charts).map(async ([key, chart]) => {
        try {
          const chartData = await fetchChartData(chart.endpoint, chart.filters);
          return [key, { ...chart, chartData }] as [string, ChartProps];
        } catch (err) {
          console.error(`Error fetching chart ${key}:`, err);
          return [key, { ...chart, chartData: [] }] as [string, ChartProps];
        }
      })
    );

    const updatedCharts = Object.fromEntries(entries);

    setCharts(updatedCharts);
  };

  useEffect(() => {
    const init = async () => {
      await fetchAllCharts();

      const interval = setInterval(() => fetchAllCharts(), 5 * 60 * 1000);
      return () => clearInterval(interval);
    };

    init();
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between">
          <h2 className="text-gray-900 mb-2">Dashboard Overview</h2>
          <div className="flex items-center">
            <Switch checked={false} id="edit-mode" />
            <Label htmlFor="edit-mode">Modo Edição</Label>
          </div>
        </div>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your restaurant today.
          <Popover>
            <PopoverTrigger className="items-center px-6 pt-6">
              <Pencil className="w-6 h-6" />
            </PopoverTrigger>
            <PopoverContent className="z-50 bg-white ">
              <Input type="text" placeholder="Texto de Apresentação" />
            </PopoverContent>
          </Popover>
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="text-green-600">{stat.change}</span>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <div className="flex justify-between items-center">
            <CardHeader className="flex-1">
              <CardTitle className="whitespace-nowrap overflow-hidden text-ellipsis">
                {charts["1"].title}
              </CardTitle>
            </CardHeader>
            {/* div className="items-center px-6 pt-6">

            </div> */}
            <Popover>
              <PopoverTrigger className="items-center px-6 pt-6">
                <Pencil className="w-6 h-6" />
              </PopoverTrigger>
              <PopoverContent className="z-50 bg-white">
                Place content for the popover here.
              </PopoverContent>
            </Popover>
          </div>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={charts["1"].chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey={charts["1"].xAxis} stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={charts["1"].yAxis}
                  stroke={charts["1"].color}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Bar dataKey="orders" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600">Items</th>
                  <th className="text-left py-3 px-4 text-gray-600">Total</th>
                  <th className="text-left py-3 px-4 text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-gray-600">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-gray-900">{order.id}</td>
                    <td className="py-3 px-4 text-gray-900">
                      {order.customer}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{order.items}</td>
                    <td className="py-3 px-4 text-gray-900">{order.total}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Preparing"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "Delivered"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
