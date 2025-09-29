"use client";
import { useState, useEffect } from 'react';
import {
  Users,
  FileSpreadsheet,
  Settings,
  User,
  Trash2,
  Edit,
  Plus,
  Search,
  Database,
  Brain,
  Upload,
  Sparkles,
  Download
} from 'lucide-react';
import toast from 'react-hot-toast';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
};

type Assessment = {
  id: string;
  name: string;
  createdBy: string;
  createdAt: string;
  status: 'completed' | 'in-progress' | 'draft';
};

type Dataset = {
  id: string;
  name: string;
  version: string;
  records: number;
  updatedAt: string;
};

type AIModel = {
  id: string;
  name: string;
  accuracy: number;
  status: 'Active' | 'Training' | 'Inactive';
  updatedAt: string;
};

type TabKey = 'datasets' | 'aiModels' | 'users' | 'assessments' | 'settings';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('datasets');
  const [users, setUsers] = useState<User[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [aiModels, setAiModels] = useState<AIModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data fetch
  useEffect(() => {
    const fetchData = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setUsers([
          { id: '1', name: 'Rahul Sharma', email: 'rahul.sharma@example.com', role: 'Admin', lastLogin: '2023-05-15 14:30' },
          { id: '2', name: 'Priya Patel', email: 'priya.patel@example.com', role: 'User', lastLogin: '2023-05-14 09:45' },
          { id: '3', name: 'Arun Kumar', email: 'arun.kumar@example.com', role: 'User', lastLogin: '2023-05-13 11:20' },
          { id: '4', name: 'Sneha Gupta', email: 'sneha.gupta@example.com', role: 'User', lastLogin: '2023-05-12 16:15' },
          { id: '5', name: 'Vikram Singh', email: 'vikram.singh@example.com', role: 'Manager', lastLogin: '2023-05-11 10:30' },
        ]);
        
        setAssessments([
          { id: '101', name: 'Steel Production LCA', createdBy: 'Rahul Sharma', createdAt: '2023-05-10', status: 'completed' },
          { id: '102', name: 'Aluminum Recycling Assessment', createdBy: 'Priya Patel', createdAt: '2023-05-08', status: 'completed' },
          { id: '103', name: 'Copper Mining Impact', createdBy: 'Arun Kumar', createdAt: '2023-05-05', status: 'in-progress' },
          { id: '104', name: 'Iron Ore Processing', createdBy: 'Sneha Gupta', createdAt: '2023-05-02', status: 'draft' },
          { id: '105', name: 'Zinc Production Analysis', createdBy: 'Vikram Singh', createdAt: '2023-04-28', status: 'in-progress' },
        ]);
        setDatasets([
          { id: 'd1', name: 'Metal Emissions Database', version: 'v2.1', records: 2345, updatedAt: '2024-01-15' },
          { id: 'd2', name: 'Energy Grid Factors', version: 'v1.8', records: 456, updatedAt: '2024-01-12' },
          { id: 'd3', name: 'Transport Emissions', version: 'v3.0', records: 789, updatedAt: '2024-01-10' },
        ]);
        setAiModels([
          { id: 'm1', name: 'Carbon Footprint Predictor', accuracy: 92.5, status: 'Active', updatedAt: '2024-01-14' },
          { id: 'm2', name: 'Circularity Optimizer', accuracy: 88.3, status: 'Training', updatedAt: '2024-01-13' },
          { id: 'm3', name: 'Resource Efficiency Model', accuracy: 90.1, status: 'Active', updatedAt: '2024-01-11' },
        ]);
        setIsLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success('User deleted successfully');
  };

  const handleDeleteAssessment = (assessmentId: string) => {
    setAssessments(assessments.filter(assessment => assessment.id !== assessmentId));
    toast.success('Assessment deleted successfully');
  };

  const handleEditUser = (userId: string) => {
    // In a real app, this would open a modal or navigate to edit page
    toast.success(`Edit user with ID: ${userId}`);
  };

  const handleEditAssessment = (assessmentId: string) => {
    // In a real app, this would open a modal or navigate to edit page
    toast.success(`Edit assessment with ID: ${assessmentId}`);
  };

  const handleAddUser = () => {
    toast.success('Add new user modal opened');
  };

  const handleAddAssessment = () => {
    toast.success('Add new assessment modal opened');
  };

  const handleUploadDataset = () => {
    toast.success('Upload dataset workflow started');
  };

  const handleEditDataset = (datasetId: string) => {
    toast.success(`Edit dataset with ID: ${datasetId}`);
  };

  const handleDeleteDataset = (datasetId: string) => {
    setDatasets(datasets.filter(dataset => dataset.id !== datasetId));
    toast.success('Dataset deleted successfully');
  };

  const handleDownloadDataset = (datasetId: string) => {
    toast.success(`Downloading dataset with ID: ${datasetId}`);
  };

  const handleTrainNewModel = () => {
    toast.success('Model training pipeline initiated');
  };

  const handleDeployModel = (modelId: string) => {
    setAiModels(models =>
      models.map(model =>
        model.id === modelId ? { ...model, status: 'Active' } : model
      )
    );
    toast.success('Model deployment started');
  };

  const handleConfigureModel = (modelId: string) => {
    toast.success(`Configure model with ID: ${modelId}`);
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const matchesQuery = (value: string) =>
    value.toLowerCase().includes(normalizedQuery);

  const filteredUsers = users.filter(user =>
    normalizedQuery === '' ||
    matchesQuery(user.name) ||
    matchesQuery(user.email) ||
    matchesQuery(user.role)
  );

  const filteredAssessments = assessments.filter(assessment =>
    normalizedQuery === '' ||
    matchesQuery(assessment.name) ||
    matchesQuery(assessment.createdBy) ||
    matchesQuery(assessment.status)
  );

  const filteredDatasets = datasets.filter(dataset =>
    normalizedQuery === '' ||
    matchesQuery(dataset.name) ||
    matchesQuery(dataset.version)
  );

  const filteredAiModels = aiModels.filter(model =>
    normalizedQuery === '' ||
    matchesQuery(model.name) ||
    matchesQuery(model.status)
  );

  const tabs = [
    { key: 'datasets', label: 'Datasets', icon: Database },
    { key: 'aiModels', label: 'AI Models', icon: Brain },
    { key: 'users', label: 'Users', icon: Users },
    { key: 'assessments', label: 'Assessments', icon: FileSpreadsheet },
    { key: 'settings', label: 'Settings', icon: Settings },
  ] as const satisfies Array<{ key: TabKey; label: string; icon: typeof Users }>;

  const searchPlaceholderMap: Record<TabKey, string> = {
    datasets: 'Search datasets...',
    aiModels: 'Search AI models...',
    users: 'Search users...',
    assessments: 'Search assessments...',
    settings: 'Search settings...',
  };

  const showSearch = activeTab !== 'settings';
  const searchPlaceholder = searchPlaceholderMap[activeTab];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModelStatusStyles = (status: AIModel['status']) => {
    switch (status) {
      case 'Active':
        return {
          badge: 'bg-green-50 text-green-700 border border-green-100',
          text: 'text-green-600'
        };
      case 'Training':
        return {
          badge: 'bg-amber-50 text-amber-700 border border-amber-100',
          text: 'text-amber-600'
        };
      default:
        return {
          badge: 'bg-gray-100 text-gray-600 border border-gray-200',
          text: 'text-gray-500'
        };
    }
  };

  const activeTabLabel = tabs.find(tab => tab.key === activeTab)?.label ?? 'Items';

  const primaryActionButton = (() => {
    switch (activeTab) {
      case 'datasets':
        return (
          <button
            onClick={handleUploadDataset}
            className="flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-green-700"
          >
            <Upload size={16} />
            <span>Upload Dataset</span>
          </button>
        );
      case 'aiModels':
        return (
          <button
            onClick={handleTrainNewModel}
            className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700"
          >
            <Sparkles size={16} />
            <span>Train New Model</span>
          </button>
        );
      case 'users':
        return (
          <button
            onClick={handleAddUser}
            className="flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-green-700"
          >
            <Plus size={16} />
            <span>Add User</span>
          </button>
        );
      case 'assessments':
        return (
          <button
            onClick={handleAddAssessment}
            className="flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-green-700"
          >
            <Plus size={16} />
            <span>Add Assessment</span>
          </button>
        );
      default:
        return null;
    }
  })();

  const showToolbar = showSearch || Boolean(primaryActionButton);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Admin Dashboard</h1>
      
      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200">
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700'
              }`}
            >
              <Icon
                size={18}
                className={isActive ? 'text-green-600' : 'text-gray-400'}
              />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {showToolbar && (
        <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          {showSearch && (
            <div className="relative w-full sm:w-96">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                aria-label={`Search ${activeTabLabel.toLowerCase()}`}
                placeholder={searchPlaceholder}
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
          {primaryActionButton && (
            <div className="flex w-full justify-end sm:w-auto">
              {primaryActionButton}
            </div>
          )}
        </div>
      )}

      {/* Content based on active tab */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      ) : (
        <>
          {activeTab === 'datasets' && (
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="flex flex-col gap-2 border-b border-gray-100 px-6 py-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Dataset Management</h2>
                  <p className="text-sm text-gray-500">Manage datasets, versions, and availability for lifecycle assessments.</p>
                </div>
                <span className="text-sm font-medium text-gray-400">
                  {filteredDatasets.length} {filteredDatasets.length === 1 ? 'dataset' : 'datasets'}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Dataset Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Version
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Records
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Updated
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredDatasets.map((dataset) => (
                      <tr key={dataset.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                          {dataset.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{dataset.version}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{dataset.records.toLocaleString()}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{dataset.updatedAt}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-right">
                          <div className="flex justify-end gap-3 text-sm font-medium">
                            <button
                              onClick={() => handleEditDataset(dataset.id)}
                              className="flex items-center gap-1 text-green-600 transition hover:text-green-700"
                            >
                              <Edit size={16} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDownloadDataset(dataset.id)}
                              className="flex items-center gap-1 text-blue-600 transition hover:text-blue-700"
                            >
                              <Download size={16} />
                              Download
                            </button>
                            <button
                              onClick={() => handleDeleteDataset(dataset.id)}
                              className="flex items-center gap-1 text-red-600 transition hover:text-red-700"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredDatasets.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                          No datasets match your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'aiModels' && (
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">AI Model Management</h2>
                  <p className="text-sm text-gray-500">Monitor model performance, rollout status, and retraining needs.</p>
                </div>
                <span className="text-sm font-medium text-gray-400">
                  {filteredAiModels.length} {filteredAiModels.length === 1 ? 'model' : 'models'}
                </span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredAiModels.map((model) => {
                  const statusStyles = getModelStatusStyles(model.status);
                  return (
                    <div
                      key={model.id}
                      className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <h3 className="text-lg font-semibold text-gray-800">{model.name}</h3>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles.badge}`}>
                            {model.status}
                          </span>
                        </div>
                        <div className="mt-4 space-y-3 text-sm text-gray-600">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Accuracy</span>
                            <span className="font-semibold text-gray-900">{model.accuracy.toFixed(1)}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Updated</span>
                            <span>{model.updatedAt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          onClick={() => handleDeployModel(model.id)}
                          className="flex min-w-[110px] items-center justify-center gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100"
                        >
                          Deploy
                        </button>
                        <button
                          onClick={() => handleConfigureModel(model.id)}
                          className="flex min-w-[110px] items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                        >
                          Configure
                        </button>
                      </div>
                    </div>
                  );
                })}
                {filteredAiModels.length === 0 && (
                  <div className="col-span-full rounded-lg border border-dashed border-gray-200 p-10 text-center text-sm text-gray-500">
                    No AI models match your search.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastLogin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleEditUser(user.id)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'assessments' && (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assessment Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created By
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAssessments.map((assessment) => (
                    <tr key={assessment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{assessment.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{assessment.createdBy}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {assessment.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(assessment.status)}`}>
                          {assessment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleEditAssessment(assessment.id)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteAssessment(assessment.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">General Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Platform Name
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md w-full p-2"
                        defaultValue="Dhatuchakra LCA Platform"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        className="border border-gray-300 rounded-md w-full p-2"
                        defaultValue="support@dhatuchakra.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Security Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
                        <input 
                          type="checkbox" 
                          id="toggle-2fa" 
                          className="sr-only"
                          onChange={() => toast.success('Two-factor authentication setting updated')}
                        />
                        <label 
                          htmlFor="toggle-2fa" 
                          className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform cursor-pointer"
                        ></label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Session Timeout</p>
                        <p className="text-xs text-gray-500">Automatically log out inactive users</p>
                      </div>
                      <select 
                        className="border border-gray-300 rounded-md p-1" 
                        onChange={() => toast.success('Session timeout setting updated')}
                      >
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>4 hours</option>
                        <option>8 hours</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Email Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="notify-assessment" 
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        onChange={() => toast.success('Assessment notification setting updated')}
                      />
                      <label htmlFor="notify-assessment" className="ml-2 block text-sm text-gray-700">
                        New assessment notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="notify-user" 
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        onChange={() => toast.success('User notification setting updated')}
                      />
                      <label htmlFor="notify-user" className="ml-2 block text-sm text-gray-700">
                        New user registrations
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="notify-report" 
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        onChange={() => toast.success('Report notification setting updated')}
                      />
                      <label htmlFor="notify-report" className="ml-2 block text-sm text-gray-700">
                        Report generation completed
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
                    onClick={() => toast.success('Settings saved successfully')}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}