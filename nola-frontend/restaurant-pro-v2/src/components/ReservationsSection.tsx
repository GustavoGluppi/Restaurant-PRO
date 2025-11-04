import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calendar, Clock, Users, Phone } from 'lucide-react';

const reservations = [
  { id: '1', name: 'Robert Johnson', guests: 4, date: '2025-10-28', time: '7:00 PM', phone: '(555) 123-4567', status: 'confirmed' },
  { id: '2', name: 'Maria Garcia', guests: 2, date: '2025-10-28', time: '7:30 PM', phone: '(555) 234-5678', status: 'confirmed' },
  { id: '3', name: 'David Lee', guests: 6, date: '2025-10-28', time: '8:00 PM', phone: '(555) 345-6789', status: 'pending' },
  { id: '4', name: 'Jennifer White', guests: 3, date: '2025-10-29', time: '6:30 PM', phone: '(555) 456-7890', status: 'confirmed' },
  { id: '5', name: 'Michael Brown', guests: 5, date: '2025-10-29', time: '7:00 PM', phone: '(555) 567-8901', status: 'confirmed' },
  { id: '6', name: 'Amanda Martinez', guests: 2, date: '2025-10-29', time: '8:30 PM', phone: '(555) 678-9012', status: 'pending' },
  { id: '7', name: 'James Taylor', guests: 4, date: '2025-10-30', time: '6:00 PM', phone: '(555) 789-0123', status: 'confirmed' },
  { id: '8', name: 'Patricia Anderson', guests: 8, date: '2025-10-30', time: '7:30 PM', phone: '(555) 890-1234', status: 'confirmed' },
];

export function ReservationsSection() {
  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-gray-900 mb-2">Reservations</h2>
          <p className="text-gray-600">Manage table reservations and bookings.</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          New Reservation
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 mb-1">Today's Reservations</p>
                <p className="text-gray-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 mb-1">Total Guests</p>
                <p className="text-gray-900">42</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-600 mb-1">Pending</p>
                <p className="text-gray-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Reservations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-gray-900">{reservation.name}</p>
                      <span className={`px-2 py-1 rounded-full ${
                        reservation.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {reservation.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{reservation.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{reservation.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{reservation.guests} guests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{reservation.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
