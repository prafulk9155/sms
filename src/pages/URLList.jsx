import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUrls } from '../store/urlSlice';

const UrlPage = () => {
  const dispatch = useDispatch();
  const { data: urls, loading, error } = useSelector((state) => state.urls);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMethod, setSortMethod] = useState('title-asc');
  const [showRefreshNotification, setShowRefreshNotification] = useState(false);

  useEffect(() => {
    loadUrls();
  }, []);

  const loadUrls = () => {
    dispatch(fetchUrls());
  };

  const handleRefresh = () => {
    loadUrls();
    setShowRefreshNotification(true);
    setTimeout(() => setShowRefreshNotification(false), 3000);
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === "0000-00-00 00:00:00") return 'Never';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  const getUserInitials = (email) => {
    if (!email) return '';
    const parts = email.split('@')[0].split('.');
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied to clipboard: ${text}`);
  };

  const sortUrls = (urlList) => {
    if (!urlList || urlList.length === 0) return [];
  
    return [...urlList].sort((a, b) => {
      const [method, direction] = sortMethod.split('-');
  
      if (method === 'title') {
        const nameA = a.title || '';
        const nameB = b.title || '';
        return direction === 'asc' 
          ? nameA.localeCompare(nameB) 
          : nameB.localeCompare(nameA);
      } else if (method === 'date') {
        const dateA = a.last_updated || a.added_on || '';
        const dateB = b.last_updated || b.added_on || '';
        return direction === 'asc' 
          ? new Date(dateA) - new Date(dateB) 
          : new Date(dateB) - new Date(dateA);
      } else if (method === 'status') {
        const statusA = a.status || '';
        const statusB = b.status || '';
        return direction === 'asc' 
          ? statusA.localeCompare(statusB) 
          : statusB.localeCompare(statusA);
      }
      return 0;
    });
  };

  const filteredUrls = urls.filter(url => 
    url.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    url.url?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAndFilteredUrls = sortUrls(filteredUrls);

  // Determine if we need to show the empty state
  const showEmptyState = !loading && !error && (!urls || urls.length === 0);
  const showNoResults = !loading && !error && urls.length > 0 && sortedAndFilteredUrls.length === 0;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">URL Management</h1>
          <p className="text-gray-600">View and manage your URLs</p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center self-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New URL
        </button>
      </div>

      {/* Search and actions bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by title, URL, user or status..."
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              className="p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortMethod}
              onChange={(e) => setSortMethod(e.target.value)}
            >
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="date-asc">Updated (Oldest)</option>
              <option value="date-desc">Updated (Newest)</option>
              <option value="status-asc">Status (A-Z)</option>
              <option value="status-desc">Status (Z-A)</option>
            </select>
            
            <button
              onClick={handleRefresh}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 flex items-center"
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${loading ? 'animate-spin' : ''} mr-1`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Notification */}
      {showRefreshNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg transition-opacity duration-500">
          URLs refreshed successfully!
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading URLs...</span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>Error loading URLs: {error}</p>
          </div>
          <button 
            className="mt-2 text-sm underline hover:text-red-800"
            onClick={handleRefresh}
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty state */}
      {showEmptyState && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No URLs Added Yet</h3>
          <p className="text-gray-600 mb-4">Start adding URLs to see them listed here.</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
            Add Your First URL
          </button>
        </div>
      )}

      {/* No search results */}
      {showNoResults && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">No URLs match your search for "{searchTerm}"</p>
          <button 
            className="mt-2 text-blue-500 hover:text-blue-700"
            onClick={() => setSearchTerm('')}
          >
            Clear search
          </button>
        </div>
      )}

      {/* URL List */}
      {!loading && !error && sortedAndFilteredUrls.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedAndFilteredUrls.map((url) => (
            <div key={url.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-gray-800 truncate mb-1">{url.title || 'Unnamed URL'}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(url.status)}`}>
                    {url.status || 'Unknown'}
                  </span>
                </div>
                
                <div className="relative group">
                  <a 
                    href={url.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:text-blue-700 text-sm truncate block mb-2 pr-6"
                  >
                    {url.url}
                  </a>
                  <button 
                    onClick={() => copyToClipboard(url.url)}
                    className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Copy URL"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold mr-2">
                      {getUserInitials(url.user)}
                    </div>
                    <span className="text-gray-600 truncate max-w-xs">{url.user || 'No user'}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {url.last_updated ? `Updated: ${formatDate(url.last_updated)}` : 'Never updated'}
                </div>
                
                {url.last_login && url.last_login !== "0000-00-00 00:00:00" && (
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Last login: {formatDate(url.last_login)}
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 flex justify-between">
                <button className="text-sm text-gray-600 hover:text-blue-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </button>
                <button className="text-sm text-gray-600 hover:text-red-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination - for future implementation */}
      {!loading && !error && sortedAndFilteredUrls.length > 9 && (
        <div className="mt-6 flex justify-center">
          <nav className="flex items-center space-x-1">
            <button className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="px-3 py-1 rounded-md bg-blue-500 text-white font-medium">1</button>
            <button className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100">2</button>
            <button className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default UrlPage;