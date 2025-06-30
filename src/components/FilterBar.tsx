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
  const hasFilters = Object.values(selectedFilters).some(arr => arr.length > 0);

  const FilterChip: React.FC<{ 
    label: string; 
    count: number; 
    onClick: () => void;
    onClear: () => void;
  }> = ({ label, count, onClick, onClear }) => (
    <div className="flex items-center">
      <button
        onClick={onClick}
        className="
          flex items-center space-x-2 px-3 py-1.5 
          border border-gray-300 rounded-lg text-sm
          hover:border-gray-400 hover:bg-gray-50
          focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
          transition-all duration-150 ease-out
        "
      >
        <span>{label}</span>
        {count > 0 && (
          <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-full">
            {count}
          </span>
        )}
        <ChevronDown className="w-3 h-3 text-gray-400" />
      </button>
      {count > 0 && (
        <button
          onClick={onClear}
          className="ml-1 p-1 hover:bg-gray-100 rounded transition-colors duration-150"
          aria-label={`Clear ${label} filter`}
        >
          <X className="w-3 h-3 text-gray-400" />
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <FilterChip
            label="Status"
            count={selectedFilters.status.length}
            onClick={() => {}}
            onClear={() => onFilterChange('status', [])}
          />
          <FilterChip
            label="Tags"
            count={selectedFilters.tags.length}
            onClick={() => {}}
            onClear={() => onFilterChange('tags', [])}
          />
          <FilterChip
            label="Created By"
            count={selectedFilters.createdBy.length}
            onClick={() => {}}
            onClear={() => onFilterChange('createdBy', [])}
          />
          
          {selectedCount > 0 && (
            <div className="text-sm text-gray-600">
              {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="
                appearance-none bg-white border border-gray-300 rounded-lg
                px-3 py-1.5 pr-8 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                cursor-pointer
              "
            >
              <option value="updated">Recently Updated</option>
              <option value="created">Recently Created</option>
              <option value="name">Name A-Z</option>
              <option value="executions">Most Executions</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`
                p-1.5 rounded transition-all duration-150 ease-out
                ${viewMode === 'grid' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
              aria-label="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`
                p-1.5 rounded transition-all duration-150 ease-out
                ${viewMode === 'list' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};