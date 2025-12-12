'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, LogOut, Edit2, Camera, Upload, Briefcase } from 'lucide-react';
import Modal from '@/components/Modal';

export default function ProfilePage() {
    // Mock user data
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Product Designer",
        joinDate: "January 2024",
        avatar: null as string | null
    });

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editForm, setEditForm] = useState(user);

    const handleEditClick = () => {
        setEditForm(user); // Reset edit form to current user data
        setIsEditOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // Create a fake local URL for preview
            const url = URL.createObjectURL(e.target.files[0]);
            setEditForm(prev => ({ ...prev, avatar: url }));
        }
    };

    const handleSave = () => {
        setUser(editForm);
        setIsEditOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
            >
                {/* Profile Header Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden ring-1 ring-gray-900/5 dark:ring-white/10 mb-6">
                    <div className="h-32 bg-brand"></div>
                    <div className="px-6 pb-6">
                        <div className="relative flex items-end -mt-12 mb-6">
                            <div className="relative group cursor-pointer" onClick={handleEditClick}>
                                <div className="h-24 w-24 rounded-full ring-4 ring-white dark:ring-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                                    {user.avatar ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <User className="h-12 w-12 text-gray-400" />
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Camera className="w-6 h-6 text-white" />
                                </div>
                                <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-brand text-white hover:bg-brand/90 transition-colors shadow-sm z-10">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="ml-6 mb-1">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
                            </div>
                            <div className="ml-auto mb-1">
                                <button
                                    onClick={handleEditClick}
                                    className="flex items-center gap-2 px-4 py-2 bg-brand/10 dark:bg-brand/30 text-brand dark:text-brand/80 rounded-lg hover:bg-brand/20 dark:hover:bg-brand/40 transition-colors font-medium text-sm"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Email Address
                                </label>
                                <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                        <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <span>{user.email}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Member Since
                                </label>
                                <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                        <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <span>{user.joinDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings / Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden ring-1 ring-gray-900/5 dark:ring-white/10">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Settings</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">Sign Out</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Log out of your account on this device</p>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors font-medium text-sm">
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Edit Profile Modal */}
            <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Profile">
                <div className="space-y-6">
                    {/* Image Upload in Modal */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden mb-4 ring-2 ring-brand ring-offset-2 dark:ring-offset-gray-800">
                            {editForm.avatar ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={editForm.avatar} alt="Preview" className="h-full w-full object-cover" />
                            ) : (
                                <User className="h-full w-full p-6 text-gray-400" />
                            )}
                            <label htmlFor="modal-upload" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer transition-opacity">
                                <Camera className="w-8 h-8 text-white" />
                                <input type="file" id="modal-upload" onChange={handleImageUpload} className="hidden" accept="image/*" />
                            </label>
                        </div>
                        <label htmlFor="modal-upload-btn" className="cursor-pointer flex items-center gap-2 text-sm text-brand hover:text-brand/80 font-medium">
                            <Upload className="w-4 h-4" /> Change Photo
                            <input type="file" id="modal-upload-btn" onChange={handleImageUpload} className="hidden" accept="image/*" />
                        </label>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <input
                                    name="name"
                                    value={editForm.name}
                                    onChange={handleInputChange}
                                    type="text"
                                    className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand dark:bg-gray-800 dark:text-white"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Job Role</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <input
                                    name="role"
                                    value={editForm.role}
                                    onChange={handleInputChange}
                                    type="text"
                                    className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand dark:bg-gray-800 dark:text-white"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <input
                                    name="email"
                                    value={editForm.email}
                                    onChange={handleInputChange}
                                    type="email"
                                    className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand dark:bg-gray-800 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => setIsEditOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-brand hover:bg-brand/90 text-white font-medium rounded-lg shadow-lg shadow-brand/20 dark:shadow-brand/30 transition-all hover:scale-105"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
