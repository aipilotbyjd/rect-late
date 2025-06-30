import React from 'react';
import { Search, Plus } from 'lucide-react';

interface HeaderProps {
  onNewWorkflow: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNewWorkflow,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center space-x-6">
        <h1 className="text-2xl font-bold text-gray-900">Workflows</h1>
        
        <div className="relative min-w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="
              w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
              text-sm transition-all duration-150 ease-out
            "
          />
        </div>
      </div>

      <button
        onClick={onNewWorkflow}
        className="
          flex items-center space-x-2 px-4 py-2 
          bg-blue-600 hover:bg-blue-700 
          text-white text-sm font-medium rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
          transition-all duration-150 ease-out
          transform hover:scale-105 active:scale-95
        "
      >
        <Plus className="w-4 h-4" />
        <span>New Workflow</span>
      </button>
    </div>
  );
};