import  { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const DatabaseDashboard = () => {
  // Sample data - replace with your actual data source
  const [timeRange, setTimeRange] = useState('1h');
  const [dbType] = useState('MySQL');
  
  // Query performance data
  const queryData = [
    { time: '12:00', queries: 245, avgResponseTime: 12 },
    { time: '12:05', queries: 267, avgResponseTime: 15 },
    { time: '12:10', queries: 289, avgResponseTime: 18 },
    { time: '12:15', queries: 312, avgResponseTime: 22 },
    { time: '12:20', queries: 298, avgResponseTime: 19 },
    { time: '12:25', queries: 276, avgResponseTime: 16 },
    { time: '12:30', queries: 254, avgResponseTime: 14 },
  ];
  
  // Connection pool data
  const connectionData = [
    { time: '12:00', active: 18, idle: 32, max: 100 },
    { time: '12:05', active: 24, idle: 26, max: 100 },
    { time: '12:10', active: 32, idle: 18, max: 100 },
    { time: '12:15', active: 42, idle: 8, max: 100 },
    { time: '12:20', active: 36, idle: 14, max: 100 },
    { time: '12:25', active: 28, idle: 22, max: 100 },
    { time: '12:30', active: 22, idle: 28, max: 100 },
  ];
  
  // Database size
  const dbSizeData = [
    { name: 'users', size: 12.4 },
    { name: 'products', size: 8.7 },
    { name: 'orders', size: 18.2 },
    { name: 'analytics', size: 32.6 },
    { name: 'logs', size: 15.8 },
  ];
  
  // Top 5 slow queries
  const slowQueries = [
    { id: 1, query: 'SELECT * FROM analytics WHERE date > ? ORDER BY metric DESC', avgTime: '3.2s', executions: 126 },
    { id: 2, query: 'SELECT products.*, categories.name FROM products JOIN categories ON products.category_id = categories.id', avgTime: '2.8s', executions: 245 },
    { id: 3, query: 'UPDATE orders SET status = ? WHERE created_at < ? AND status = ?', avgTime: '2.5s', executions: 87 },
    { id: 4, query: 'SELECT COUNT(*) FROM logs GROUP BY error_type, date', avgTime: '2.1s', executions: 54 },
    { id: 5, query: 'DELETE FROM temp_sessions WHERE last_activity < ?', avgTime: '1.8s', executions: 12 },
  ];
  
  // Current transactions
  const activeTransactions = [
    { id: 'tx1', user: 'app_user', started: '12:25:34', state: 'active', query: 'INSERT INTO orders...' },
    { id: 'tx2', user: 'analytics', started: '12:24:56', state: 'idle in transaction', query: 'UPDATE inventory...' },
    { id: 'tx3', user: 'app_user', started: '12:26:12', state: 'active', query: 'SELECT FROM products...' },
    { id: 'tx4', user: 'admin', started: '12:25:48', state: 'active', query: 'CREATE INDEX ON...' },
    { id: 'tx5', user: 'backup', started: '12:20:33', state: 'idle in transaction', query: 'COPY users TO...' },
  ];
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  return (
    <div className="p-4 w-full bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Database Monitoring</h1>
          <p className="text-gray-600">{dbType} Database</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeRange('1h')}
            className={`px-3 py-1 rounded ${timeRange === '1h' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            1h
          </button>
          <button 
            onClick={() => setTimeRange('6h')}
            className={`px-3 py-1 rounded ${timeRange === '6h' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            6h
          </button>
          <button 
            onClick={() => setTimeRange('24h')}
            className={`px-3 py-1 rounded ${timeRange === '24h' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            24h
          </button>
        </div>
      </div>
      
      {/* Database performance overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Query Performance</h2>
          <div className="text-3xl font-bold text-blue-600">312 Queries/min</div>
          <div className="text-lg text-gray-600">Avg Response: 22ms</div>
          <div className="h-40 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={queryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" orientation="left" stroke="#0088FE" />
                <YAxis yAxisId="right" orientation="right" stroke="#FF8042" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="queries" stroke="#0088FE" strokeWidth={2} name="Queries/min" />
                <Line yAxisId="right" type="monotone" dataKey="avgResponseTime" stroke="#FF8042" strokeWidth={2} name="Avg Response Time (ms)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Connection Pool</h2>
          <div className="text-3xl font-bold text-green-600">42 Active / 100 Max</div>
          <div className="text-lg text-gray-600">8 Idle Connections</div>
          <div className="h-40 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={connectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" stackId="a" fill="#00C49F" name="Active" />
                <Bar dataKey="idle" stackId="a" fill="#0088FE" name="Idle" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Database size section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="col-span-1 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Database Size</h2>
          <div className="text-3xl font-bold text-purple-600">87.7 GB</div>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dbSizeData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="size"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {dbSizeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} GB`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="col-span-2 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Top 5 Slow Queries</h2>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-2 text-left">Query</th>
                <th className="py-2 px-2 text-left">Avg Time</th>
                <th className="py-2 px-2 text-left">Executions</th>
              </tr>
            </thead>
            <tbody>
              {slowQueries.map((query, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="py-2 px-2 font-mono text-xs truncate max-w-md">{query.query}</td>
                  <td className="py-2 px-2">{query.avgTime}</td>
                  <td className="py-2 px-2">{query.executions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Active transactions section */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Active Transactions</h2>
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 text-left">Transaction ID</th>
              <th className="py-2 px-4 text-left">User</th>
              <th className="py-2 px-4 text-left">Started</th>
              <th className="py-2 px-4 text-left">State</th>
              <th className="py-2 px-4 text-left">Current Query</th>
            </tr>
          </thead>
          <tbody>
            {activeTransactions.map((tx, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="py-2 px-4">{tx.id}</td>
                <td className="py-2 px-4">{tx.user}</td>
                <td className="py-2 px-4">{tx.started}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded text-xs ${tx.state === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {tx.state}
                  </span>
                </td>
                <td className="py-2 px-4 font-mono text-xs truncate max-w-md">{tx.query}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DatabaseDashboard;