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
  Search
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

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'assessments' | 'settings'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
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

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAssessments = assessments.filter(assessment => 
    assessment.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    assessment.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          className={`py-3 px-6 font-medium ${activeTab === 'users' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('users')}
        >
          <div className="flex items-center gap-2">
            <Users size={18} />
            <span>Users</span>
          </div>
        </button>
        <button 
          className={`py-3 px-6 font-medium ${activeTab === 'assessments' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('assessments')}
        >
          <div className="flex items-center gap-2">
            <FileSpreadsheet size={18} />
            <span>Assessments</span>
          </div>
        </button>
        <button 
          className={`py-3 px-6 font-medium ${activeTab === 'settings' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('settings')}
        >
          <div className="flex items-center gap-2">
            <Settings size={18} />
            <span>Settings</span>
          </div>
        </button>
      </div>

      {/* Search bar and actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={activeTab === 'users' ? handleAddUser : handleAddAssessment}
          className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
        >
          <Plus size={16} />
          <span>Add {activeTab === 'users' ? 'User' : activeTab === 'assessments' ? 'Assessment' : 'Setting'}</span>
        </button>
      </div>

      {/* Content based on active tab */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      ) : (
        <>
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