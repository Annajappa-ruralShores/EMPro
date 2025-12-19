'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Mail, Clock, CheckCircle } from 'lucide-react';

interface HelpRequest {
    _id: string;
    username: string;
    email: string;
    subject: string;
    message: string;
    status: 'pending' | 'resolved';
    createdAt: string;
}

export default function AdminHelpPage() {
    const [requests, setRequests] = useState<HelpRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/api/help');
                setRequests(response.data.data);
            } catch (error) {
                console.error("Failed to fetch help requests", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help Requests</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.length === 0 ? (
                    <p className="text-gray-500 col-span-full">No help requests found.</p>
                ) : (
                    requests.map((req) => (
                        <div key={req._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{req.subject}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                                        <Mail className="w-3 h-3" /> {req.email}
                                    </p>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full ${req.status === 'resolved'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    }`}>
                                    {req.status}
                                </span>
                            </div>

                            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                                {req.message}
                            </p>

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs text-gray-500">
                                <div className="flex flex-col gap-1">
                                    <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{req.username}</span>
                                </div>
                                {req.status === 'pending' && (
                                    <button
                                        onClick={async () => {
                                            if (!confirm("Mark this request as resolved?")) return;
                                            try {
                                                const res = await axios.put(`/api/help/${req._id}`, { status: 'resolved' });
                                                setRequests(requests.map(r => r._id === req._id ? res.data.data : r));
                                            } catch (error) {
                                                console.error("Failed to update status", error);
                                                alert("Failed to update status");
                                            }
                                        }}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition-colors"
                                    >
                                        <CheckCircle className="w-3 h-3" />
                                        Resolve
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
