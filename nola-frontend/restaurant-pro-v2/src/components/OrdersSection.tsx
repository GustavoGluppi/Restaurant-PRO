import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Search, Filter, Eye } from 'lucide-react';

const orders = [
  { id: '#1234', customer: 'John Doe', items: '2x Burger, 1x Fries', total: '$28.50', status: 'completed', time: '10:30 AM', date: '2025-10-28' },
  { id: '#1235', customer: 'Jane Smith', items: '1x Pasta, 2x Salad', total: '$42.00', status: 'preparing', time: '10:45 AM', date: '2025-10-28' },
  { id: '#1236', customer: 'Mike Johnson', items: '3x Pizza, 1x Soda', total: '$65.00', status: 'delivered', time: '11:00 AM', date: '2025-10-28' },
  { id: '#1237', customer: 'Sarah Williams', items: '1x Steak, 1x Wine', total: '$85.50', status: 'completed', time: '11:15 AM', date: '2025-10-28' },
  { id: '#1238', customer: 'Tom Brown', items: '2x Sandwich', total: '$18.00', status: 'pending', time: '11:30 AM', date: '2025-10-28' },
  { id: '#1239', customer: 'Emily Davis', items: '1x Sushi Set, 1x Miso Soup', total: '$52.00', status: 'preparing', time: '11:45 AM', date: '2025-10-28' },
  { id: '#1240', customer: 'Chris Wilson', items: '2x Tacos, 1x Burrito', total: '$34.50', status: 'completed', time: '12:00 PM', date: '2025-10-28' },
  { id: '#1241', customer: 'Lisa Anderson', items: '1x Chicken Wings, 2x Beer', total: '$28.00', status: 'delivered', time: '12:15 PM', date: '2025-10-28' },
];

export function OrdersSection() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-700';
      case 'delivered':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-gray-100 text-gray-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2">Orders Management</h2>
        <p className="text-gray-600">View and manage all restaurant orders.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>All Orders</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={filter === 'pending' ? 'default' : 'outline'}
                  onClick={() => setFilter('pending')}
                >
                  Pending
                </Button>
                <Button
                  variant={filter === 'preparing' ? 'default' : 'outline'}
                  onClick={() => setFilter('preparing')}
                >
                  Preparing
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600">Order ID</th>
                  <th className="text-left py-3 px-4 text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 text-gray-600">Items</th>
                  <th className="text-left py-3 px-4 text-gray-600">Total</th>
                  <th className="text-left py-3 px-4 text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-gray-600">Time</th>
                  <th className="text-left py-3 px-4 text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{order.id}</td>
                    <td className="py-3 px-4 text-gray-900">{order.customer}</td>
                    <td className="py-3 px-4 text-gray-600">{order.items}</td>
                    <td className="py-3 px-4 text-gray-900">{order.total}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 rounded-full capitalize ${getStatusVariant(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{order.time}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
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
