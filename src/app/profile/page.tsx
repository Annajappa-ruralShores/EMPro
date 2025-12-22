'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { User, Mail, Shield, Calendar, Edit2, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState("");

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const res = await axios.get('/api/users/me');
                setUser(res.data.data);
                setEditName(res.data.data.Fullname);
            } catch (error: any) {
                console.log(error.message);
                // If fetching fails (likely expired token), redirect to login
                // But middleware handles protection. If we are here, we should have a token.
            } finally {
                setLoading(false);
            }
        }
        getUserDetails();
    }, []);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let response = await axios.put('/api/users/me', { Fullname: editName });
            if (response.status === 200) {
                toast.success("Profile updated successfully");
            }
            setUser({ ...user, Fullname: editName });
            setIsEditing(false);
            // Optional: Show success toast
        } catch (error) {
            console.error("Failed to update profile", error);
        }
    }

    // const logout = async () => {
    //     try {
    //         await axios.get('/api/users/logout');
    //         router.push('/login');
    //     } catch (error: any) {
    //         console.log(error.message);
    //     }
    // }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
            >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
                    <div className="h-32 bg-linear-to-r from-purple-500 to-indigo-600"></div>
                    <div className="px-8 pb-8 relative">
                        <div className="relative -top-16 mb-4 flex justify-between items-end">
                            <div className="rounded-full bg-white dark:bg-gray-800 p-2 ring-4 ring-white dark:ring-gray-900">
                                <div className="h-32 w-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-gray-400">
                                    {user?.Fullname?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                <Edit2 className="w-4 h-4" /> Edit Profile
                            </button>
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                {user?.Fullname}
                                {user?.isAdmin && (
                                    <Shield className="w-6 h-6 text-purple-500" />
                                )}
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">{user?.Email}</p>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
                        <div className="space-y-4">

                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                <User className="w-5 h-5 text-gray-400" aria-label="User ID" />
                                <div>
                                    <p className="text-xs text-gray-400">User ID</p>
                                    <p className="text-sm font-mono">{user?._id}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                <Mail className="w-5 h-5 text-gray-400" aria-label="Email Address" />
                                <div>
                                    <p className="text-xs text-gray-400">Email Address</p>
                                    <p className="text-sm">{user?.Email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-400">Joined Date</p>
                                    <p className="text-sm">{new Date(user?.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Actions</h3>
                        <div className="space-y-3">
                            <button
                                onClick={logout}
                                className="w-full flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                            >
                                <span className="font-medium">Logout</span>
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div> */}
                </div>

            </motion.div>

            {/* Edit Profile Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
                    >
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Profile</h2>
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 outline-none dark:text-white"
                                    required
                                />
                            </div>
                            <div className="flex gap-3 justify-end mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
