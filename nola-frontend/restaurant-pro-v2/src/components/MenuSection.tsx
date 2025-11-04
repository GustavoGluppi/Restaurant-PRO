import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const menuItems = [
  { id: '1', name: 'Classic Burger', category: 'Main Course', price: '$12.99', status: 'available', description: 'Juicy beef patty with fresh vegetables' },
  { id: '2', name: 'Margherita Pizza', category: 'Main Course', price: '$14.99', status: 'available', description: 'Traditional Italian pizza with fresh mozzarella' },
  { id: '3', name: 'Caesar Salad', category: 'Appetizer', price: '$8.99', status: 'available', description: 'Fresh romaine lettuce with Caesar dressing' },
  { id: '4', name: 'Spaghetti Carbonara', category: 'Main Course', price: '$13.99', status: 'available', description: 'Classic Italian pasta with creamy sauce' },
  { id: '5', name: 'Grilled Salmon', category: 'Main Course', price: '$18.99', status: 'available', description: 'Fresh Atlantic salmon with herbs' },
  { id: '6', name: 'French Fries', category: 'Side Dish', price: '$4.99', status: 'available', description: 'Crispy golden fries' },
  { id: '7', name: 'Chocolate Cake', category: 'Dessert', price: '$6.99', status: 'available', description: 'Rich chocolate layer cake' },
  { id: '8', name: 'Iced Coffee', category: 'Beverage', price: '$3.99', status: 'available', description: 'Cold brew coffee with ice' },
];

const categories = ['All', 'Main Course', 'Appetizer', 'Side Dish', 'Dessert', 'Beverage'];

export function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-gray-900 mb-2">Menu Management</h2>
          <p className="text-gray-600">Manage your restaurant menu items and categories.</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4">
                <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <ImageWithFallback
                    src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-gray-900">{item.name}</h3>
                  <span className="text-orange-600">{item.price}</span>
                </div>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                    {item.category}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full capitalize">
                    {item.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
