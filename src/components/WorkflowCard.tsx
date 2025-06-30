import React from 'react';
import { 
  Play, 
  Pause, 
  MoreHorizontal, 
  Clock, 
  User, 
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface Workflow {
  id: string;
  title: string;
  status: 'active' | 'paused' | 'error' | 'draft';
  tags: string[];
  createdBy: string;
  createdAt: string;
  executions: number;
  lastRun?: string;
}

interface WorkflowCardProps {
  workflow: Workflow;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onAction: (id: string, action: string) => void;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({
  workflow,
  isSelected,
  onSelect,
  onAction,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-3 h-3" />;
      case 'paused':
        return <Pause className="w-3 h-3" />;
      case 'error':
        return <XCircle className="w-3 h-3" />;
      case 'draft':
        return <AlertCircle className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div
      className={`
        h-24 bg-white border rounded-lg p-4 cursor-pointer
        transition-all duration-150 ease-out
        hover:shadow-md hover:scale-[1.01]
        focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent
        ${isSelected 
          ? 'border-blue-600 bg-blue-50 shadow-md' 
          : 'border-gray-200 hover:border-gray-300'
        }
      `}
      onClick={() => onSelect(workflow.id)}
    >
      <div className="flex items-start justify-between h-full">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium text-gray-900 truncate pr-2">
              {workflow.title}
            </h3>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className={`
                flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium border
                ${getStatusColor(workflow.status)}
              `}>
                {getStatusIcon(workflow.status)}
                <span className="capitalize">{workflow.status}</span>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAction(workflow.id, 'menu');
                }}
                className="
                  p-1 rounded hover:bg-gray-100 
                  focus:outline-none focus:ring-2 focus:ring-blue-600
                  transition-colors duration-150
                "
                aria-label="More actions"
              >
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <User className="w-3 h-3" />
                <span>{workflow.createdBy}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{workflow.createdAt}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Activity className="w-3 h-3" />
                <span>{workflow.executions.toLocaleString()} runs</span>
              </div>
            </div>

            <div className="flex space-x-1">
              {workflow.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
              {workflow.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  +{workflow.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};