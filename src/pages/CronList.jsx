import  { useState } from 'react';
import { Clock, Plus, Edit2, Trash2, Play, Pause, MoreHorizontal, Search, Filter, RefreshCw } from 'lucide-react';

const CronList = () => {
  // Sample data
  const initialJobs = [
    { id: 1, name: "Database Backup", schedule: "0 0 * * *", command: "/usr/bin/backup.sh", status: "Active", lastRun: "2025-02-26 23:00:05", nextRun: "2025-02-27 23:00:00", server: "DB Server" },
    { id: 2, name: "Log Rotation", schedule: "0 2 * * 0", command: "/usr/bin/logrotate", status: "Active", lastRun: "2025-02-23 02:00:12", nextRun: "2025-03-02 02:00:00", server: "App Server" },
    { id: 3, name: "Temp Cleanup", schedule: "0 3 * * *", command: "rm -rf /tmp/*", status: "Paused", lastRun: "2025-02-25 03:00:01", nextRun: "N/A", server: "Web Server" },
    { id: 4, name: "System Updates", schedule: "0 4 1 * *", command: "apt update && apt upgrade -y", status: "Active", lastRun: "2025-02-01 04:00:45", nextRun: "2025-03-01 04:00:00", server: "All Servers" },
    { id: 5, name: "Health Check", schedule: "*/15 * * * *", command: "/usr/bin/health_check.sh", status: "Active", lastRun: "2025-02-27 09:45:02", nextRun: "2025-02-27 10:00:00", server: "All Servers" }
  ];

  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [loading, setLoading] = useState(false);

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job => 
    job.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.server.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle job status
  const toggleJobStatus = (id) => {
    setJobs(jobs.map(job => 
      job.id === id 
        ? {...job, status: job.status === 'Active' ? 'Paused' : 'Active'} 
        : job
    ));
  };

  // Delete job
  const deleteJob = (id) => {
    if (confirm('Are you sure you want to delete this cron job?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  // Edit job
  const editJob = (job) => {
    setCurrentJob(job);
    setShowAddModal(true);
  };

  // Refresh data
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // New job form state
  const [newJob, setNewJob] = useState({
    name: '',
    schedule: '',
    command: '',
    server: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({
      ...newJob,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentJob) {
      // Update existing job
      setJobs(jobs.map(job => 
        job.id === currentJob.id 
          ? {...job, ...newJob} 
          : job
      ));
    } else {
      // Add new job
      const newId = Math.max(...jobs.map(job => job.id)) + 1;
      setJobs([...jobs, {
        id: newId,
        ...newJob,
        status: 'Active',
        lastRun: 'Never',
        nextRun: 'Pending'
      }]);
    }
    
    setShowAddModal(false);
    setCurrentJob(null);
    setNewJob({
      name: '',
      schedule: '',
      command: '',
      server: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center">
          <Clock className="h-6 w-6 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Cron Jobs</h1>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Cron Job
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search cron jobs..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </button>
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Command</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Server</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Run</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Run</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.length > 0 ? filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{job.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-700 font-mono">{job.schedule}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-700 font-mono truncate max-w-xs">{job.command}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-700">{job.server}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {job.lastRun}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {job.nextRun}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => toggleJobStatus(job.id)}
                        className={`p-1 rounded-md ${
                          job.status === 'Active' 
                            ? 'text-blue-600 hover:bg-blue-100' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        title={job.status === 'Active' ? 'Pause' : 'Activate'}
                      >
                        {job.status === 'Active' ? <Pause size={18} /> : <Play size={18} />}
                      </button>
                      <button 
                        onClick={() => editJob(job)}
                        className="p-1 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100 rounded-md"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => deleteJob(job.id)}
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
                    No cron jobs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Cron Job Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                {currentJob ? 'Edit Cron Job' : 'Add New Cron Job'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={currentJob ? currentJob.name : newJob.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Database Backup"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-1">
                    Cron Schedule
                  </label>
                  <input
                    type="text"
                    id="schedule"
                    name="schedule"
                    value={currentJob ? currentJob.schedule : newJob.schedule}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 0 0 * * *"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Format: minute hour day month weekday (e.g., 0 0 * * * for daily at midnight)
                  </p>
                </div>
                
                <div>
                  <label htmlFor="command" className="block text-sm font-medium text-gray-700 mb-1">
                    Command
                  </label>
                  <textarea
                    id="command"
                    name="command"
                    value={currentJob ? currentJob.command : newJob.command}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., /usr/bin/backup.sh"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="server" className="block text-sm font-medium text-gray-700 mb-1">
                    Server
                  </label>
                  <select
                    id="server"
                    name="server"
                    value={currentJob ? currentJob.server : newJob.server}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a server</option>
                    <option value="DB Server">DB Server</option>
                    <option value="App Server">App Server</option>
                    <option value="Web Server">Web Server</option>
                    <option value="All Servers">All Servers</option>
                  </select>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-2 rounded-b-lg">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setCurrentJob(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {currentJob ? 'Update Job' : 'Add Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CronList;