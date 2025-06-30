"use client";

import React, { useState, useMemo } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { FilterBar } from '../../components/FilterBar';
import { WorkflowCard } from '../../components/WorkflowCard';
import { RightPanel } from '../../components/RightPanel';
import { BarChart3 } from 'lucide-react';

// Mock data
const mockWorkflows = [
    {
        id: '1',
        title: 'Customer Onboarding Automation',
        status: 'active' as const,
        tags: ['onboarding', 'email', 'crm'],
        createdBy: 'Sarah Chen',
        createdAt: '2 days ago',
        executions: 1247,
        lastRun: '5 minutes ago',
    },
    {
        id: '2',
        title: 'Invoice Processing Pipeline',
        status: 'active' as const,
        tags: ['finance', 'pdf', 'approval'],
        createdBy: 'Mike Johnson',
        createdAt: '1 week ago',
        executions: 892,
        lastRun: '1 hour ago',
    },
    {
        id: '3',
        title: 'Social Media Content Scheduler',
        status: 'paused' as const,
        tags: ['social', 'content', 'scheduling'],
        createdBy: 'Emma Davis',
        createdAt: '3 days ago',
        executions: 456,
        lastRun: '2 days ago',
    },
    {
        id: '4',
        title: 'Lead Qualification Bot',
        status: 'error' as const,
        tags: ['sales', 'chatbot', 'leads'],
        createdBy: 'Alex Rodriguez',
        createdAt: '1 day ago',
        executions: 234,
        lastRun: '30 minutes ago',
    },
    {
        id: '5',
        title: 'Data Backup Scheduler',
        status: 'active' as const,
        tags: ['backup', 'database', 'cron'],
        createdBy: 'Lisa Wang',
        createdAt: '5 days ago',
        executions: 2103,
        lastRun: '12 hours ago',
    },
    {
        id: '6',
        title: 'Email Campaign Automation',
        status: 'draft' as const,
        tags: ['email', 'marketing', 'campaign'],
        createdBy: 'David Miller',
        createdAt: '2 hours ago',
        executions: 0,
        lastRun: 'Never',
    },
];

function WorkflowsPage() {
    const [activeMenuItem, setActiveMenuItem] = useState('workflows');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({
        status: [] as string[],
        tags: [] as string[],
        createdBy: [] as string[],
    });
    const [sortBy, setSortBy] = useState('updated');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>([]);
    const [isPanelOpen, setIsPanelOpen] = useState(true);

    const filteredWorkflows = useMemo(() => {
        let filtered = mockWorkflows;

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(workflow =>
                workflow.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                workflow.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Apply status filter
        if (selectedFilters.status.length > 0) {
            filtered = filtered.filter(workflow =>
                selectedFilters.status.includes(workflow.status)
            );
        }

        // Apply sorting
        switch (sortBy) {
            case 'name':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'executions':
                filtered.sort((a, b) => b.executions - a.executions);
                break;
            case 'created':
            case 'updated':
            default:
                // For demo purposes, keep original order
                break;
        }

        return filtered;
    }, [searchQuery, selectedFilters, sortBy]);

    const handleFilterChange = (type: string, values: string[]) => {
        setSelectedFilters(prev => ({
            ...prev,
            [type]: values,
        }));
    };

    const handleWorkflowSelect = (id: string) => {
        setSelectedWorkflows(prev =>
            prev.includes(id)
                ? prev.filter(wid => wid !== id)
                : [...prev, id]
        );
    };

    const handleWorkflowAction = (id: string, action: string) => {
        console.log(`Action ${action} on workflow ${id}`);
    };

    const handleNewWorkflow = () => {
        console.log('Creating new workflow');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-['Inter'] grid grid-cols-[64px,1fr,auto]">
            {/* Sidebar */}
            <Sidebar
                activeItem={activeMenuItem}
                onItemClick={setActiveMenuItem}
            />

            {/* Main Content */}
            <div className="flex flex-col min-w-0">
                {/* Header */}
                <Header
                    onNewWorkflow={handleNewWorkflow}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                {/* Filter Bar */}
                <FilterBar
                    selectedFilters={selectedFilters}
                    onFilterChange={handleFilterChange}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    selectedCount={selectedWorkflows.length}
                />

                {/* Workflows Grid */}
                <div className="flex-1 p-6">
                    {filteredWorkflows.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <BarChart3 className="w-12 h-12 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No workflows found
                            </h3>
                            <p className="text-gray-500 mb-6">
                                {searchQuery || Object.values(selectedFilters).some(arr => arr.length > 0)
                                    ? "Try adjusting your search or filters"
                                    : "Get started by creating your first workflow"
                                }
                            </p>
                            {!searchQuery && Object.values(selectedFilters).every(arr => arr.length === 0) && (
                                <button
                                    onClick={handleNewWorkflow}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150"
                                >
                                    Create Workflow
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className={`
              grid gap-4 
              ${viewMode === 'grid'
                                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                : 'grid-cols-1'
                            }
            `}>
                            {filteredWorkflows.map((workflow) => (
                                <WorkflowCard
                                    key={workflow.id}
                                    workflow={workflow}
                                    isSelected={selectedWorkflows.includes(workflow.id)}
                                    onSelect={handleWorkflowSelect}
                                    onAction={handleWorkflowAction}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Panel */}
            <RightPanel
                isOpen={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
            />
        </div>
    );
}

export default WorkflowsPage;
