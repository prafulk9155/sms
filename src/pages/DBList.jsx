import  { useState } from 'react';
import { Database, Plus, Edit2, Trash2, ExternalLink, Check, X, RefreshCw, Search, Filter, Download, MoreHorizontal } from 'lucide-react';

const DBList = () => {
  // Sample data
  const initialDatabases = [
    { id: 1, name: "Production DB", type: "MySQL", version: "8.0.28", host: "db-prod.example.com", port: 3306, username: "dbadmin", size: "42.6 GB", status: "Online", backupStatus: "Success", lastBackup: "2025-02-26 23:00:05" },
    { id: 2, name: "Analytics DB", type: "PostgreSQL", version: "14.2", host: "db-analytics.example.com", port: 5432, username: "analyst", size: "128.3 GB", status: "Online", backupStatus: "Success", lastBackup: "2025-02-26 23:15:22" },
    { id: 3, name: "Staging DB", type: "MySQL", version: "8.0.28", host: "db-staging.example.com", port: 3306, username: "dev", size: "12.8 GB", status: "Online", backupStatus: "Success", lastBackup: "2025-02-26 23:30:11" },
    { id: 4, name: "Legacy System", type: "MariaDB", version: "10.6.7", host: "db-legacy.example.com", port: 3306, username: "admin", size: "5.2 GB", status: "Maintenance", backupStatus: "Failed", lastBackup: "2025-02-25 23:00:17" },
    { id: 5, name: "User Data", type: "MongoDB", version: "5.0.6", host: "db-users.example.com", port: 27017, username: "userservice", size: "18.9 GB", status: "Online", backupStatus: "Success", lastBackup: "2025-02-26 23:45:38" }
  ];

  const [databases, setDatabases] = useState(initialDatabases);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentDb, setCurrentDb] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  // Filter databases based on search term and type filter
  const filteredDatabases = databases.filter(db => {
    const matchesSearch = db.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         db.host.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || db.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Get unique database types for filter
  const dbTypes = [...new Set(databases.map(db => db.type))];

  // Delete database
  const deleteDatabase = (id) => {
    if (confirm('Are you sure you want to delete this database connection?')) {
      setDatabases(databases.filter(db => db.id !== id));
    }
  };

  // Edit database
  const editDatabase = (db) => {
    setCurrentDb(db);
    setShowAddModal(true);
  };

  // Refresh data
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // New database form state
  const [newDb, setNewDb] = useState({
    name: '',
    type: '',
    version: '',
    host: '',
    port: '',
    username: '',
    password: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDb({
      ...newDb,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentDb) {
      // Update existing database
      setDatabases(databases.map(db => 
        db.id === currentDb.id 
          ? {...db, ...newDb} 
          : db
      ));
    } else {
      // Add new database
      const newId = Math.max(...databases.map(db => db.id)) + 1;
      setDatabases([...databases, {
        id: newId,
        ...newDb,
        size: 'N/A',
        status: 'Online',
        backupStatus: 'Pending',
        lastBackup: 'Never'
      }]);
    }
    
    setShowAddModal(false);
    setCurrentDb(null);
    setNewDb({
      name: '',
      type: '',
      version: '',
      host: '',
      port: '',
      username: '',
      password: ''
    });
  };

  return (
<div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center">
          <Database className="h-6 w-6 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Database Management</h1>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Database
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
          <div className="flex space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search databases..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Database Types</option>
              {dbTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-2">
            <button 
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-50"
              onClick={refreshData}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Host</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Port</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Backup</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDatabases.length > 0 ? filteredDatabases.map((db) => (
                <tr key={db.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{db.name}</div>
                    <div className="text-sm text-gray-500">{db.version}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-700">{db.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-700">{db.host}</div>
                    <div className="text-sm text-gray-500">User: {db.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {db.port}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {db.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      db.status === 'Online' ? 'bg-green-100 text-green-800' : 
                      db.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {db.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-700">{db.lastBackup}</div>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      db.backupStatus === 'Success' ? 'bg-green-100 text-green-800' : 
                      db.backupStatus === 'Pending' ? 'bg-blue-100 text-blue-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {db.backupStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-md"
                        title="Connect"
                      >
                        <ExternalLink size={18} />
                      </button>
                      <button 
                        onClick={() => editDatabase(db)}
                        className="p-1 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100 rounded-md"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        className="p-1 text-green-600 hover:text-green-900 hover:bg-green-100 rounded-md"
                        title="Backup Now"
                      >
                        <Download size={18} />
                      </button>
                      <button 
                        onClick={() => deleteDatabase(db.id)}
                        className="p-1 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-md"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                    No database connections found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Database Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingDatabase ? 'Edit Database' : 'Add New Database'}
              </h3>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editingDatabase ? editingDatabase.name : ''}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Type</label>
                <input
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editingDatabase ? editingDatabase.type : ''}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">User</label>
                <input
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editingDatabase ? editingDatabase.user : ''}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password" 
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editingDatabase ? editingDatabase.password : ''}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button 
                  onClick={editingDatabase ? updateDatabase : addDatabase}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  {editingDatabase ? 'Update' : 'Add'}
                </button>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DBList;