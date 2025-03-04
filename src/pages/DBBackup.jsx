import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDatabases } from '../store/dbSlice';
import { Database, Plus, RefreshCw, Search } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const DBBackupList = () => {
  const dispatch = useDispatch();
  const { databases, loading, error } = useSelector((state) => state.db);
  
  useEffect(() => {
    dispatch(fetchDatabases());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const filteredDatabases = databases.filter(db => {
    const matchesSearch = db.db_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         db.host.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || db.type === selectedType;
    return matchesSearch && matchesType;
  });

  const dbTypes = [...new Set(databases.map(db => db.type))];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Database className="h-6 w-6 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Database Management</h1>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="h-5 w-5 mr-1" />
          Add Database
        </button>
      </div>

      <div className="p-4 border-b border-gray-200 flex justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search databases..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:ring-blue-500 focus:border-blue-500"
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
        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center" onClick={() => dispatch(fetchDatabases())}>
          <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto mt-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading databases...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Host</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Port</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Backup on</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDatabases.length > 0 ? filteredDatabases.map((db) => (
                <tr key={db.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{db.db_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{db.type?db.type:"SQL"} </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{db.host?db.host:"140"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{db.port?db.port:"3306"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{db.last_updated?formatDistanceToNow(new Date(db.last_updated), { addSuffix: true }):"N/A"}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No database connections found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DBBackupList;
