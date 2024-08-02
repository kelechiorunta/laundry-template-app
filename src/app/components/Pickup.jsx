// components/LaundryPickup.js
import { useState } from 'react';
import { FaSpinner, FaCheckCircle, FaTimesCircle, FaPlay, FaPause } from 'react-icons/fa';

const statuses = {
    pending: { icon: <FaPause />, color: 'text-yellow-500', label: 'Pending' },
    inProgress: { icon: <FaSpinner className="animate-spin" />, color: 'text-blue-500', label: 'In Progress' },
    completed: { icon: <FaCheckCircle />, color: 'text-green-500', label: 'Completed' },
    failed: { icon: <FaTimesCircle />, color: 'text-red-500', label: 'Failed' },
};

export default function Pickup() {
    const [pickups, setPickups] = useState([]);
    const [form, setForm] = useState({ item: '', status: 'pending' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setPickups([...pickups, { ...form, id: Date.now() }]);
        setForm({ item: '', status: 'pending' });
    };

    const handleStatusChange = (id, newStatus) => {
        setPickups(pickups.map(pickup => 
            pickup.id === id ? { ...pickup, status: newStatus } : pickup
        ));
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Item</label>
                    <input
                        type="text"
                        value={form.item}
                        onChange={(e) => setForm({ ...form, item: e.target.value })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                        {Object.keys(statuses).map(status => (
                            <option key={status} value={status}>{statuses[status].label}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Pickup</button>
            </form>

            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Item</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pickups.map((pickup) => (
                        <tr key={pickup.id} className="border-b">
                            <td className="py-2">{pickup.item}</td>
                            <td className={`py-2 flex items-center space-x-2 ${statuses[pickup.status].color}`}>
                                {statuses[pickup.status].icon}
                                <span>{statuses[pickup.status].label}</span>
                            </td>
                            <td className="py-2">
                                {pickup.status === 'pending' && (
                                    <button
                                        onClick={() => handleStatusChange(pickup.id, 'inProgress')}
                                        className="px-2 py-1 text-sm bg-blue-500 text-white rounded-md"
                                    >
                                        Start
                                    </button>
                                )}
                                {pickup.status === 'inProgress' && (
                                    <button
                                        onClick={() => handleStatusChange(pickup.id, 'completed')}
                                        className="px-2 py-1 text-sm bg-green-500 text-white rounded-md"
                                    >
                                        Complete
                                    </button>
                                )}
                                {pickup.status !== 'completed' && (
                                    <button
                                        onClick={() => handleStatusChange(pickup.id, 'failed')}
                                        className="ml-2 px-2 py-1 text-sm bg-red-500 text-white rounded-md"
                                    >
                                        Fail
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
