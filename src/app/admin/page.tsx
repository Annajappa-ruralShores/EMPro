'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, HelpCircle, Activity } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        usersCount: 0,
        helpCount: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            // In a real app, optimize this to a single stats API call
            try {
                const [usersRes, helpRes] = await Promise.all([
                    axios.get('/api/users'),
                    axios.get('/api/help')
                ]);
                setStats({
                    usersCount: usersRes.data?.data?.length || 0,
                    helpCount: helpRes.data?.data?.length || 0
                });
            } catch (error) {
                console.error("Failed to fetch stats", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Users Stat */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.usersCount}</h3>
                        </div>
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                            <Users className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* Help Requests Stat */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Help Requests</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.helpCount}</h3>
                        </div>
                        <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl text-yellow-600 dark:text-yellow-400">
                            <HelpCircle className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* System Status (Placeholder) */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">System Status</p>
                            <h3 className="text-3xl font-bold text-green-500 mt-1">Healthy</h3>
                        </div>
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-600 dark:text-green-400">
                            <Activity className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center min-h-[300px] flex flex-col items-center justify-center text-gray-500">
                <Activity className="w-12 h-12 mb-4 opacity-50" />
                <p>Real-time analytics chart would go here</p>
            </div>
        </div>
    );
}
