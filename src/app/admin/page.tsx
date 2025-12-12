'use client';

import { motion } from 'framer-motion';
import { Mail, Edit2, Trash2, Search, Filter, Shield, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

export default function AdminPage() {
    // Mock Data with extended fields
    const initialUsers = [
        {
            _id: "654321987654321",
            Fullname: "Alice Johnson",
            Email: "alice@example.com",
            Password: "$2b$10$EixZA...",
            Role: "Admin",
            Status: "Active",
            createdAt: "2024-01-15T08:30:00Z",
            updatedAt: "2024-01-20T10:00:00Z",
        },
        {
            _id: "654321987654322",
            Fullname: "Bob Smith",
            Email: "bob.smith@co.com",
            Password: "$2b$10$Uj9Ks...",
            Role: "User",
            Status: "Active",
            createdAt: "2024-02-20T14:15:00Z",
            updatedAt: "2024-02-21T09:45:00Z",
        },
        {
            _id: "654321987654323",
            Fullname: "Charlie Brown",
            Email: "charlie@web.org",
            Password: "$2b$10$9sLk2...",
            Role: "User",
            Status: "Inactive",
            createdAt: "2023-11-05T11:20:00Z",
            updatedAt: "2023-12-01T16:30:00Z",
        },
        {
            _id: "654321987654324",
            Fullname: "Diana Prince",
            Email: "diana@hero.com",
            Password: "$2b$10$P2mNx...",
            Role: "Admin",
            Status: "Pending",
            createdAt: "2024-03-10T09:00:00Z",
            updatedAt: "2024-03-10T09:00:00Z",
        },
    ];

    const [users, setUsers] = useState(initialUsers);
    const [filters, setFilters] = useState({
        _id: '',
        Fullname: '',
        Email: '',
        Role: '',
    });

    // Handle Filter Change
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);

        // Basic filtering logic
        const filtered = initialUsers.filter(user => {
            return (
                user._id.toLowerCase().includes(newFilters._id.toLowerCase()) &&
                user.Fullname.toLowerCase().includes(newFilters.Fullname.toLowerCase()) &&
                user.Email.toLowerCase().includes(newFilters.Email.toLowerCase()) &&
                (newFilters.Role === '' || user.Role === newFilters.Role)
            );
        });
        setUsers(filtered);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-[95%] mx-auto"
            >
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <Shield className="w-8 h-8 text-brand dark:text-brand/80" />
                            Admin Console
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Advanced database view with filtering and management.
                        </p>
                    </div>
                </div>

                {/* Users Table Container */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3 min-w-[60px]">S.No</th>
                                    <th scope="col" className="px-4 py-3 min-w-[150px]">
                                        <div className="flex items-center gap-1">DB_Id <ArrowUpDown className="w-3 h-3" /></div>
                                    </th>
                                    <th scope="col" className="px-4 py-3 min-w-[150px]">
                                        <div className="flex items-center gap-1">Fullname <ArrowUpDown className="w-3 h-3" /></div>
                                    </th>
                                    <th scope="col" className="px-4 py-3 min-w-[180px]">
                                        <div className="flex items-center gap-1">Email <ArrowUpDown className="w-3 h-3" /></div>
                                    </th>
                                    <th scope="col" className="px-4 py-3 min-w-[120px]">Password</th>
                                    <th scope="col" className="px-4 py-3 min-w-[150px]">Created At</th>
                                    <th scope="col" className="px-4 py-3 min-w-[150px]">Updated At</th>
                                    <th scope="col" className="px-4 py-3 min-w-[100px]">Role</th>
                                    <th scope="col" className="px-4 py-3 text-right">Actions</th>
                                </tr>
                                {/* Filter Row */}
                                <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th className="px-4 py-2"></th>
                                    <th className="px-4 py-2">
                                        <div className="relative">
                                            <input
                                                name="_id"
                                                value={filters._id}
                                                onChange={handleFilterChange}
                                                type="text"
                                                className="w-full px-2 py-1 text-xs border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-1 focus:ring-brand"
                                                placeholder="Filter ID"
                                            />
                                            <Search className="w-3 h-3 absolute right-2 top-1.5 text-gray-400" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-2">
                                        <div className="relative">
                                            <input
                                                name="Fullname"
                                                value={filters.Fullname}
                                                onChange={handleFilterChange}
                                                type="text"
                                                className="w-full px-2 py-1 text-xs border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-1 focus:ring-brand"
                                                placeholder="Filter Name"
                                            />
                                            <Search className="w-3 h-3 absolute right-2 top-1.5 text-gray-400" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-2">
                                        <div className="relative">
                                            <input
                                                name="Email"
                                                value={filters.Email}
                                                onChange={handleFilterChange}
                                                type="text"
                                                className="w-full px-2 py-1 text-xs border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-1 focus:ring-brand"
                                                placeholder="Filter Email"
                                            />
                                            <Search className="w-3 h-3 absolute right-2 top-1.5 text-gray-400" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-2"></th>
                                    <th className="px-4 py-2"></th>
                                    <th className="px-4 py-2"></th>
                                    <th className="px-4 py-2">
                                        <select
                                            name="Role"
                                            value={filters.Role}
                                            onChange={handleFilterChange}
                                            className="w-full px-2 py-1 text-xs border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-1 focus:ring-brand"
                                        >
                                            <option value="">All</option>
                                            <option value="Admin">Admin</option>
                                            <option value="User">User</option>
                                        </select>
                                    </th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {users.length > 0 ? (
                                    users.map((user, index) => (
                                        <motion.tr
                                            key={user._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        >
                                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-3 font-mono text-xs text-gray-500 dark:text-gray-400">
                                                {user._id}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                                {user.Fullname}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    <Mail className="w-3 h-3" />
                                                    {user.Email}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 font-mono text-xs">
                                                {user.Password}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">
                                                {new Date(user.createdAt).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">
                                                {new Date(user.updatedAt).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full 
                                                    ${user.Role === 'Admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                                                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'}`}>
                                                    {user.Role}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="p-1.5 text-white bg-brand rounded-md hover:bg-brand/90 shadow-sm transition-colors text-xs flex items-center gap-1">
                                                        <Edit2 className="w-3 h-3" /> Edit
                                                    </button>
                                                    <button className="p-1.5 text-white bg-red-600 rounded-md hover:bg-red-700 shadow-sm transition-colors text-xs flex items-center gap-1">
                                                        <Trash2 className="w-3 h-3" /> Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={9} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                            <div className="flex flex-col items-center justify-center">
                                                <Filter className="w-12 h-12 mb-3 text-gray-300 dark:text-gray-600" />
                                                <p className="text-lg font-medium">No users found</p>
                                                <p className="text-sm">Try adjusting your filters.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}