import React from 'react';
import { 
  Home, 
  Workflow, 
  Settings, 
  Users, 
  BarChart3, 
  HelpCircle 
} from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
  const mainMenuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'workflows', icon: Workflow, label: 'Workflows' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'users', icon: Users, label: 'Users' },
  ];

  const footerMenuItems = [
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
  ];

  const NavButton: React.FC<{item: any, isActive: boolean}> = ({ item, isActive }) => {
    const Icon = item.icon;
    return (
      <button
        key={item.id}
        onClick={() => onItemClick(item.id)}
        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-150 ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
        aria-label={item.label}
        title={item.label}
      >
        <Icon className="w-5 h-5" />
      </button>
    );
  };

  return (
    <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-4">
      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
        <Workflow className="w-6 h-6 text-white" />
      </div>
      <nav className="flex-1 flex flex-col items-center space-y-2">
        {mainMenuItems.map((item) => (
          <NavButton key={item.id} item={item} isActive={activeItem === item.id} />
        ))}
      </nav>
      <div className="flex flex-col items-center space-y-2">
        {footerMenuItems.map((item) => (
          <NavButton key={item.id} item={item} isActive={activeItem === item.id} />
        ))}
      </div>
    </div>
  );
};