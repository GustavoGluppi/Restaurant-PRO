import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardOverview } from './components/DashboardOverview';
import { OrdersSection } from './components/OrdersSection';
import { ReservationsSection } from './components/ReservationsSection';
import { MenuSection } from './components/MenuSection';
import { AnalyticsSection } from './components/AnalyticsSection';

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'orders':
        return <OrdersSection />;
      case 'reservations':
        return <ReservationsSection />;
      case 'menu':
        return <MenuSection />;
      case 'analytics':
        return <AnalyticsSection />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
}
