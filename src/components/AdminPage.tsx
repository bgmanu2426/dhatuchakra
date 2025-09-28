import { useState } from 'react';
import { Upload, Database, Settings, BarChart3, Users, Download } from 'lucide-react';

export function AdminPage() {
  const [activeTab, setActiveTab] = useState('datasets');
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const tabs = [
    { id: 'datasets', label: 'Datasets', icon: Database },
    { id: 'models', label: 'AI Models', icon: Settings },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
  ];

  const mockDatasets = [
    { name: 'Metal Emissions Database', version: 'v2.1', updated: '2024-01-15', records: 2345 },
    { name: 'Energy Grid Factors', version: 'v1.8', updated: '2024-01-12', records: 456 },
    { name: 'Transport Emissions', version: 'v3.0', updated: '2024-01-10', records: 789 },
  ];

  const mockModels = [
    { name: 'Carbon Footprint Predictor', accuracy: 92.5, status: 'Active', updated: '2024-01-14' },
    { name: 'Circularity Optimizer', accuracy: 88.3, status: 'Training', updated: '2024-01-13' },
    { name: 'Resource Efficiency Model', accuracy: 90.1, status: 'Active', updated: '2024-01-11' },
  ];

  const mockAnalytics = [
    { metric: 'Total Assessments', value: '1,234', change: '+12%' },
    { metric: 'Active Users', value: '89', change: '+8%' },
    { metric: 'Data Accuracy', value: '94.2%', change: '+2%' },
    { metric: 'Model Performance', value: '91.8%', change: '+5%' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadStatus(`Uploading ${file.name}...`);
      // Simulate upload
      setTimeout(() => {
        setUploadStatus(`Successfully uploaded ${file.name}`);
        setTimeout(() => setUploadStatus(''), 3000);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage datasets, models, and system configuration
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Datasets Tab */}
            {activeTab === 'datasets' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Dataset Management</h2>
                  <label className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Dataset
                    <input
                      type="file"
                      className="hidden"
                      accept=".csv,.xlsx,.json"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>

                {uploadStatus && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">{uploadStatus}</p>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Dataset Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Version
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Records
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Updated
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockDatasets.map((dataset, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {dataset.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {dataset.version}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {dataset.records.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {dataset.updated}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-green-600 hover:text-green-900 mr-3">
                              Edit
                            </button>
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <Download className="h-4 w-4 inline" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* AI Models Tab */}
            {activeTab === 'models' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">AI Model Management</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Train New Model
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockModels.map((model, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{model.name}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Accuracy:</span>
                          <span className="font-medium">{model.accuracy}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`font-medium ${
                            model.status === 'Active' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {model.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Updated:</span>
                          <span className="font-medium">{model.updated}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button className="flex-1 px-3 py-2 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">
                          Deploy
                        </button>
                        <button className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                          Configure
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">System Analytics</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mockAnalytics.map((metric, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-sm font-medium text-gray-600 mb-2">{metric.metric}</h3>
                      <div className="flex items-baseline justify-between">
                        <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                        <span className="text-sm font-medium text-green-600">{metric.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Trends</h3>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <p>Chart placeholder - Usage analytics over time</p>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">User Management</h2>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Add User
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <p className="font-medium text-gray-900">Sarah Johnson</p>
                        <p className="text-sm text-gray-600">Completed aluminum LCA assessment</p>
                      </div>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <p className="font-medium text-gray-900">Mike Chen</p>
                        <p className="text-sm text-gray-600">Downloaded copper production report</p>
                      </div>
                      <span className="text-sm text-gray-500">5 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium text-gray-900">Elena Rodriguez</p>
                        <p className="text-sm text-gray-600">Updated lithium processing parameters</p>
                      </div>
                      <span className="text-sm text-gray-500">1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}