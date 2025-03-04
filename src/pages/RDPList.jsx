import { useEffect, useState } from 'react';
import { Edit, Trash2, Power, Eye } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRDPs, deleteRDP, toggleRDPStatus } from '../store/rdpSlice';
import { formatDistanceToNow } from 'date-fns';


const RDPListPage = () => {
    const dispatch = useDispatch();
    const { data: rdpList, loading, error } = useSelector((state) => state.rdps);

    useEffect(() => {
        dispatch(fetchRDPs());
    }, [dispatch]);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const handleDeleteRDP = (id) => {
        if (confirm('Are you sure you want to delete this RDP?')) {
            dispatch(deleteRDP(id));
        }
    };

    const handleToggleStatus = (id) => {
        dispatch(toggleRDPStatus(id));
    };

    const filteredRDPs = rdpList.filter(rdp => {
        const matchesSearch =
            rdp.assigned_to.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rdp.ip.includes(searchTerm) ||
            rdp.user.toLowerCase().includes(searchTerm.toLowerCase()) 
          

        const matchesStatus = statusFilter === 'All' || rdp.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">RDP Management Dashboard</h1>
            
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full md:w-1/2 p-2 border rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="w-full md:w-1/4 p-2 border rounded"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    {['All', 'active', 'Idle', 'inactive'].map(option => (
                        <option key={option} value={option}>{option.toUpperCase()}</option>
                    ))}
                </select>
                <button className="bg-blue-600 text-white py-2 px-4 rounded">Add New RDP</button>
            </div>

            {loading && 
            <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Loading ...</span>
          </div>
          }
            {error && <p className="text-red-600">{error}</p>}

{!loading &&
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left border-b">S.no</th>
                            <th className="p-3 text-left border-b">IP Address</th>
                            <th className="p-3 text-left border-b">Status</th>
                            <th className="p-3 text-left border-b">Assigned To</th>
                            <th className="p-3 text-left border-b">User</th>
                            <th className="p-3 text-left border-b">Last Login</th>
                            <th className="p-3 text-center border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRDPs.length > 0 ? (
                            filteredRDPs.map(rdp => (
                                <tr key={rdp.id} className={!rdp.isActive ? "bg-gray-100" : ""}>
                                    <td className="p-3 border-b">{rdp.id}</td>
                                    <td className="p-3 border-b">{rdp.ip}</td>
                                    <td className="p-3 border-b">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                            rdp.status === 'Running' ? 'bg-green-100 text-green-800' :
                                            rdp.status === 'Idle' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {rdp.status}
                                        </span>
                                    </td>
                                    <td className="p-3 border-b">{rdp.assigned_to}</td>
                                    <td className="p-3 border-b">{rdp.user}</td>
                                    <td className="p-3 border-b"> {rdp.last_updated ? formatDistanceToNow(new Date(rdp.last_updated), { addSuffix: true }) : 'N/A'}</td>
                                    <td className="p-3 border-b text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button className="p-1 text-blue-600 hover:bg-blue-100 rounded" title="View">
                                                <Eye size={18} />
                                            </button>
                                            <button className="p-1 text-green-600 hover:bg-green-100 rounded" title="Edit">
                                                <Edit size={18} />
                                            </button>
                                            <button 
                                                className={`p-1 ${rdp.isActive ? 'text-orange-600 hover:bg-orange-100' : 'text-green-600 hover:bg-green-100'} rounded`} 
                                                title={rdp.isActive ? "Deactivate" : "Activate"}
                                                onClick={() => handleToggleStatus(rdp.id)}
                                            >
                                                <Power size={18} />
                                            </button>
                                            <button 
                                                className="p-1 text-red-600 hover:bg-red-100 rounded" 
                                                title="Delete"
                                                onClick={() => handleDeleteRDP(rdp.id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="p-3 text-center border-b">No RDP connections found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
}
        </div>
    );
};

export default RDPListPage;
