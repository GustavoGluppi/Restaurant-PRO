import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const monthlyRevenue = [
  { month: 'Jan', revenue: 45000, orders: 320, customers: 280 },
  { month: 'Feb', revenue: 52000, orders: 380, customers: 310 },
  { month: 'Mar', revenue: 48000, orders: 350, customers: 295 },
  { month: 'Apr', revenue: 61000, orders: 420, customers: 340 },
  { month: 'May', revenue: 58000, orders: 410, customers: 335 },
  { month: 'Jun', revenue: 67000, orders: 480, customers: 390 },
  { month: 'Jul', revenue: 72000, orders: 520, customers: 420 },
  { month: 'Aug', revenue: 69000, orders: 495, customers: 405 },
  { month: 'Sep', revenue: 75000, orders: 540, customers: 440 },
  { month: 'Oct', revenue: 82000, orders: 590, customers: 480 },
];

const categoryData = [
  { name: 'Main Course', value: 45, color: '#f97316' },
  { name: 'Appetizers', value: 20, color: '#fb923c' },
  { name: 'Desserts', value: 15, color: '#fdba74' },
  { name: 'Beverages', value: 12, color: '#fed7aa' },
  { name: 'Side Dishes', value: 8, color: '#ffedd5' },
];

const peakHours = [
  { hour: '9 AM', orders: 12 },
  { hour: '10 AM', orders: 18 },
  { hour: '11 AM', orders: 25 },
  { hour: '12 PM', orders: 45 },
  { hour: '1 PM', orders: 52 },
  { hour: '2 PM', orders: 38 },
  { hour: '3 PM', orders: 22 },
  { hour: '4 PM', orders: 15 },
  { hour: '5 PM', orders: 28 },
  { hour: '6 PM', orders: 48 },
  { hour: '7 PM', orders: 65 },
  { hour: '8 PM', orders: 58 },
  { hour: '9 PM', orders: 42 },
];

const topDishes = [
  { name: 'Margherita Pizza', sales: 245, revenue: '$3,675' },
  { name: 'Classic Burger', sales: 232, revenue: '$3,013' },
  { name: 'Grilled Salmon', sales: 198, revenue: '$3,760' },
  { name: 'Caesar Salad', sales: 187, revenue: '$1,681' },
  { name: 'Spaghetti Carbonara', sales: 165, revenue: '$2,308' },
];

export function AnalyticsSection() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2">Analytics & Reports</h2>
        <p className="text-gray-600">Detailed insights into your restaurant's performance.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-2">Monthly Revenue</p>
            <p className="text-gray-900 mb-2">$82,000</p>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+9.3% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-2">Total Orders</p>
            <p className="text-gray-900 mb-2">590</p>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+9.3% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-2">Avg Order Value</p>
            <p className="text-gray-900 mb-2">$139</p>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+5.1% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-2">Customer Satisfaction</p>
            <p className="text-gray-900 mb-2">4.8/5.0</p>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+0.2 from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Orders Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
                <Area type="monotone" dataKey="orders" stackId="2" stroke="#fb923c" fill="#fb923c" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Peak Hours Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={peakHours}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Dishes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDishes.map((dish, index) => (
                <div key={dish.name} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">{dish.name}</p>
                    <p className="text-gray-600">{dish.sales} orders</p>
                  </div>
                  <p className="text-gray-900">{dish.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
