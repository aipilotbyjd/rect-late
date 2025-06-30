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
    <div className="bg-white border-b border-gray-200 flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-6">
        <h1 className="text-xl font-semibold text-gray-800">Workflows</h1>
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search workflows"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-gray-50 pl-9 pr-4 py-1.5 border border-gray-200 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <button
        onClick={onNewWorkflow}
        className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="w-4 h-4" />
        <span>New Workflow</span>
      </button>
    </div>
  );
};