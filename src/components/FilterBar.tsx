import React from 'react';
import { ChevronDown, Grid3X3, List, X } from 'lucide-react';

interface FilterBarProps {
  selectedFilters: {
    status: string[];
    tags: string[];
    createdBy: string[];
  };
  onFilterChange: (type: string, values: string[]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  selectedCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedFilters,
  onFilterChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  selectedCount,
}) => {
  const FilterButton: React.FC<{ label: string; count: number }> = ({ label, count }) => (
    <button className="flex items-center space-x-2 px-3 py-1 border border-gray-300 bg-white rounded-md text-sm text-gray-700 hover:bg-gray-50">
      <span>{label}</span>
      {count > 0 && (
        <span className="bg-gray-200 text-gray-700 text-xs font-medium px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
      <ChevronDown className="w-4 h-4 text-gray-400" />
    </button>
  );

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FilterButton label="Status" count={selectedFilters.status.length} />
          <FilterButton label="Tags" count={selectedFilters.tags.length} />
          <FilterButton label="Created by" count={selectedFilters.createdBy.length} />
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-transparent border-none pl-3 pr-8 py-1 text-sm text-gray-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="updated">Recently Updated</option>
              <option value="created">Recently Created</option>
              <option value="name">Name A-Z</option>
              <option value="executions">Most Executions</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="flex border border-gray-300 rounded-md p-0.5">
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1 rounded ${viewMode === 'list' ? 'bg-gray-200 text-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-gray-200 text-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}
              aria-label="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};