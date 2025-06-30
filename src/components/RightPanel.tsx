import React from 'react';
import { 
  TrendingUp, 
  Activity, 
  Clock, 
  Users, 
  ChevronRight,
  X
} from 'lucide-react';

interface RightPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({ isOpen, onClose }) => {
  const MetricCard: React.FC<{
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: React.ReactNode;
  }> = ({ title, value, change, trend, icon }) => (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200/75">
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-500">{icon}</div>
        <div className={`text-xs font-medium ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
      <div className="text-sm text-gray-500">{title}</div>
    </div>
  );

  const ActivityItem: React.FC<{
    title: string;
    time: string;
    status: 'success' | 'error' | 'warning';
  }> = ({ title, time, status }) => {
    const statusColors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
    };

    return (
      <div className="flex items-start space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors duration-150">
        <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${statusColors[status]}`} />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-800 truncate">{title}</div>
          <div className="text-xs text-gray-500">{time}</div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 px-6 pb-6 space-y-6 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            title="Total Workflows"
            value="127"
            change="+12%"
            trend="up"
            icon={<Activity className="w-5 h-5" />}
          />
          <MetricCard
            title="Active Now"
            value="89"
            change="+5%"
            trend="up"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <MetricCard
            title="Avg Runtime"
            value="2.4s"
            change="-8%"
            trend="up"
            icon={<Clock className="w-5 h-5" />}
          />
          <MetricCard
            title="Team Size"
            value="24"
            change="+2"
            trend="up"
            icon={<Users className="w-5 h-5" />}
          />
        </div>

        <div className="bg-gray-50 rounded-lg border border-gray-200/75">
          <div className="p-4 border-b border-gray-200/75">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Execution Chart</h3>
              <button className="text-sm text-blue-600 hover:underline font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="h-32 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-indigo-600 text-2xl font-bold">23% 📈</div>
                <div className="text-sm text-indigo-500">Executions trending up</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg border border-gray-200/75">
          <div className="p-4 border-b border-gray-200/75">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Recent Activity</h3>
              <button className="text-sm text-blue-600 hover:underline font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200/75">
            <ActivityItem
              title="Data Pipeline completed"
              time="2 minutes ago"
              status="success"
            />
            <ActivityItem
              title="Email Automation failed"
              time="15 minutes ago"
              status="error"
            />
            <ActivityItem
              title="Slack Integration started"
              time="1 hour ago"
              status="warning"
            />
            <ActivityItem
              title="API Sync completed"
              time="2 hours ago"
              status="success"
            />
          </div>
        </div>

        <div className="bg-blue-600 rounded-lg p-6 text-white">
          <h3 className="font-semibold text-lg mb-2">Upgrade to Pro</h3>
          <p className="text-blue-200 text-sm mb-4">
            Unlock advanced features and unlimited workflows.
          </p>
          <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-md font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2">
            <span>Upgrade Now</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};