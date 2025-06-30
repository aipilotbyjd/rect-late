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
        return 'bg-green-100 text-green-700';
      case 'paused':
        return 'bg-yellow-100 text-yellow-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div
      className={`
        bg-white border rounded-lg p-4 cursor-pointer transition-all duration-150
        hover:shadow-sm
        ${isSelected
          ? 'border-blue-500 bg-gradient-to-r from-blue-100 to-white shadow-lg'
          : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
        }
      `}
      onClick={() => onSelect(workflow.id)}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-800 pr-2">{workflow.title}</h3>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <div className={`flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
            {getStatusIcon(workflow.status)}
            <span className="capitalize">{workflow.status}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction(workflow.id, 'menu');
            }}
            className="p-1 rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="More actions"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex justify-between items-end">
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
            <span>{workflow.executions.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex space-x-1">
          {workflow.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};