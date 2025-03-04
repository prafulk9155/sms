import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices, setSearchQuery, setSort, setActiveTab } from '../store/serviceSlice';


const ServiceList = () => {
  const dispatch = useDispatch();
  const { data, loading, error, searchQuery, sortBy, sortOrder, activeTab } = useSelector(state => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSort = (field) => {
    dispatch(setSort({ sortBy: field, sortOrder: sortOrder === 'asc' ? 'desc' : 'asc' }));
  };

  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab));
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  const filteredServices = data.filter(service =>
    (activeTab === 'all' || service.active === activeTab) &&
    (service.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()))
  ).sort((a, b) => {
    if (sortBy === 'last_updated') {
      return sortOrder === 'asc' ? new Date(a[sortBy]) - new Date(b[sortBy]) : new Date(b[sortBy]) - new Date(a[sortBy]);
    }
    return sortOrder === 'asc' ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">Service List</h1>
      <input
        type="text"
        placeholder="Search services..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded w-full"
      />
      <div className="flex border-b mb-4">
        {['all', 'active', 'inactive'].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      {loading ? (
      
        <div className="flex justify-center items-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading ...</span>
        </div>
    
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {['service', 'description', 'active', 'sub', 'last_updated'].map(field => (
                  <th
                    key={field}
                    className="py-2 px-4 border-b text-left cursor-pointer"
                    onClick={() => handleSort(field)}
                  >
                    {field.replace('_', ' ').toUpperCase()} {sortBy === field ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-2 px-4 border-b">{service.service}</td>
                  <td className="py-2 px-4 border-b">{service.description}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`px-2 py-1 rounded text-xs ${service.active === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {service.active}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">{service.sub}</td>
                  <td className="py-2 px-4 border-b">{formatDate(service.last_updated)}</td>
                </tr>
              ))}
              {filteredServices.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">No services found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ServiceList;