import  { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const ServerDashboard = () => {
  // Sample data - replace with your actual data source
  const [timeRange, setTimeRange] = useState('1h');
  
  // CPU usage data over time
  const cpuData = [
    { time: '12:00', usage: 45 },
    { time: '12:05', usage: 52 },
    { time: '12:10', usage: 49 },
    { time: '12:15', usage: 63 },
    { time: '12:20', usage: 58 },
    { time: '12:25', usage: 72 },
    { time: '12:30', usage: 68 },
  ];
  
  // Memory usage data
  const memoryData = [
    { time: '12:00', used: 6.2, total: 16 },
    { time: '12:05', used: 6.8, total: 16 },
    { time: '12:10', used: 7.1, total: 16 },
    { time: '12:15', used: 7.4, total: 16 },
    { time: '12:20', used: 7.9, total: 16 },
    { time: '12:25', used: 8.2, total: 16 },
    { time: '12:30', used: 7.8, total: 16 },
  ];
  
  // Disk usage data
  const diskData = [
    { name: 'Used', value: 320 },
    { name: 'Free', value: 680 },
  ];
  
  // Top 5 processes by CPU usage
  const topProcesses = [
    { pid: 1234, name: 'nginx', cpu: 12.5, memory: 4.2 },
    { pid: 2345, name: 'postgresql', cpu: 8.7, memory: 6.8 },
    { pid: 3456, name: 'node', cpu: 7.2, memory: 5.4 },
    { pid: 4567, name: 'python', cpu: 5.3, memory: 3.2 },
    { pid: 5678, name: 'redis-server', cpu: 3.8, memory: 2.1 },
  ];
  
  // Top users
  const topUsers = [
    { username: 'www-data', cpu: 18.7, memory: 12.4, processes: 23 },
    { username: 'postgres', cpu: 8.7, memory: 6.8, processes: 12 },
    { username: 'root', cpu: 6.3, memory: 4.5, processes: 48 },
    { username: 'nodejs', cpu: 5.2, memory: 5.0, processes: 4 },
    { username: 'ubuntu', cpu: 2.1, memory: 1.8, processes: 7 },
  ];
  
  // Active IP connections
  const ipConnections = [
    { ip: '192.168.1.105', connections: 42, bandwidth: '3.2 MB/s' },
    { ip: '192.168.1.107', connections: 28, bandwidth: '2.1 MB/s' },
    { ip: '10.0.0.15', connections: 21, bandwidth: '1.8 MB/s' },
    { ip: '172.16.0.32', connections: 18, bandwidth: '1.5 MB/s' },
    { ip: '192.168.1.113', connections: 15, bandwidth: '1.2 MB/s' },
  ];
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  return (
    <div className="p-4 w-full bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Server Monitor Dashboard</h1>
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
      
      {/* Resource usage overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">CPU Usage</h2>
          <div className="text-3xl font-bold text-blue-600">72%</div>
          <div className="h-40 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cpuData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="usage" stroke="#0088FE" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Memory Usage</h2>
          <div className="text-3xl font-bold text-green-600">8.2 GB / 16 GB</div>
          <div className="h-40 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={memoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 16]} />
                <Tooltip />
                <Line type="monotone" dataKey="used" stroke="#00C49F" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Disk Usage</h2>
          <div className="text-3xl font-bold text-yellow-600">320 GB / 1 TB</div>
          <div className="h-40 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={diskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {diskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Top processes section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Top 5 Processes</h2>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 text-left">PID</th>
                <th className="py-2 px-4 text-left">Process</th>
                <th className="py-2 px-4 text-left">CPU %</th>
                <th className="py-2 px-4 text-left">MEM %</th>
              </tr>
            </thead>
            <tbody>
              {topProcesses.map((process, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="py-2 px-4">{process.pid}</td>
                  <td className="py-2 px-4">{process.name}</td>
                  <td className="py-2 px-4">{process.cpu}%</td>
                  <td className="py-2 px-4">{process.memory}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Top Users</h2>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 text-left">Username</th>
                <th className="py-2 px-4 text-left">CPU %</th>
                <th className="py-2 px-4 text-left">MEM %</th>
                <th className="py-2 px-4 text-left">Processes</th>
              </tr>
            </thead>
            <tbody>
              {topUsers.map((user, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="py-2 px-4">{user.username}</td>
                  <td className="py-2 px-4">{user.cpu}%</td>
                  <td className="py-2 px-4">{user.memory}%</td>
                  <td className="py-2 px-4">{user.processes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* IP Connections section */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Active IP Connections</h2>
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 text-left">IP Address</th>
              <th className="py-2 px-4 text-left">Connections</th>
              <th className="py-2 px-4 text-left">Bandwidth</th>
            </tr>
          </thead>
          <tbody>
            {ipConnections.map((connection, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="py-2 px-4">{connection.ip}</td>
                <td className="py-2 px-4">{connection.connections}</td>
                <td className="py-2 px-4">{connection.bandwidth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServerDashboard;