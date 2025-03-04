import { useState } from 'react';
import { Clock, Check, AlertTriangle, RefreshCw, Database } from 'lucide-react';
import DBBackupList from './DBBackup';

const Backups = () => {
  // Demo data
  const initialBackups = [
    { id: 1, server: 'Server 1', status: 'Completed', timestamp: '2025-02-26 14:30:45', size: '2.3 GB' },
    { id: 2, server: 'Server 2', status: 'Failed', timestamp: '2025-02-26 15:12:22', size: '1.8 GB', error: 'Connection timeout' },
    { id: 3, server: 'Server 3', status: 'In Progress', timestamp: '2025-02-27 09:45:10', size: '4.1 GB', progress: 68 },
  ];

  const [backups, setBackups] = useState(initialBackups);
  const [loading, setLoading] = useState(false);
  const [showDbBackupList, setShowDbBackupList] = useState(false);

  const showDbBackup = () => {
    setShowDbBackupList(!showDbBackupList);
  };

  // Function to get status icon based on backup status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <Check className="text-green-500" size={18} />;
      case 'Failed':
        return <AlertTriangle className="text-red-500" size={18} />;
      case 'In Progress':
        return <Clock className="text-blue-500" size={18} />;
      default:
        return null;
    }
  };

  // Function to handle refresh
  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Backup Management</h1>
        <div className="flex gap-3">
          <button 
            onClick={showDbBackup}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Database size={16} />
            Db Backup
          </button>
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {!showDbBackupList && (
        <div className="overflow-x-auto bg-gray-50 rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Server</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {backups.map(backup => (
                <tr key={backup.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 whitespace-nowrap font-medium text-gray-900">#{backup.id}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-gray-700">{backup.server}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(backup.status)}
                      <span className={`ml-2 ${
                        backup.status === 'Completed' ? 'text-green-800' : 
                        backup.status === 'Failed' ? 'text-red-800' : 'text-blue-800'
                      }`}>
                        {backup.status}
                      </span>
                    </div>
                    {backup.status === 'In Progress' && (
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${backup.progress}%` }}
                        ></div>
                      </div>
                    )}
                    {backup.status === 'Failed' && backup.error && (
                      <div className="text-xs text-red-500 mt-1">{backup.error}</div>
                    )}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-gray-700">{backup.timestamp}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-gray-700">{backup.size}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    {backup.status === 'Failed' && (
                      <button className="text-green-600 hover:text-green-900 mr-3">Retry</button>
                    )}
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showDbBackupList && <DBBackupList />}

      <div className="mt-6 flex justify-end">
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
          New Backup
        </button>
      </div>
    </div>
  );
};

export default Backups;
