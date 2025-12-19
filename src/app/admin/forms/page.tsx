'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FileText, Calendar, User, Search, Eye, Edit2, Trash2 } from 'lucide-react';

export default function AdminFormsPage() {
    const [forms, setForms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingForm, setEditingForm] = useState<any | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const res = await axios.get('/api/admin/forms');
                setForms(res.data.data);
            } catch (error) {
                console.error("Failed to fetch forms", error);
            } finally {
                setLoading(false);
            }
        };
        fetchForms();
    }, []);

    const filteredForms = forms.filter(form =>
        form.orgName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.userId?.Fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }


    // Delete Form
    const handleDelete = async (formId: string) => {
        if (confirm("Are you sure you want to delete this form? This action cannot be undone.")) {
            try {
                await axios.delete(`/api/form/${formId}`);
                setForms(forms.filter(f => f._id !== formId));
            } catch (error) {
                console.error("Failed to delete form", error);
                alert("Failed to delete form");
            }
        }
    };

    // Open Edit Modal
    const handleEdit = (form: any) => {
        setEditingForm({ ...form });
        setIsEditModalOpen(true);
    };

    // Save Edited Form
    const handleSaveForm = async () => {
        if (!editingForm) return;
        try {
            const { _id, userId, ...updateData } = editingForm; // Exclude userId from update
            const res = await axios.put(`/api/form/${_id}`, updateData);

            // Update local state
            setForms(forms.map(f => f._id === _id ? res.data.data : f));
            setIsEditModalOpen(false);
            alert("Form updated successfully");
        } catch (error) {
            console.error("Failed to update form", error);
            alert("Failed to update form");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-8 h-8 text-purple-600" />
                    Submitted Forms
                </h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search forms..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-purple-500 outline-none dark:text-white w-64"
                    />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                                <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Organization</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Submitted By</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="p-4 text-xs font-semibold text-right text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {filteredForms.map((form) => (
                                <tr key={form._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900 dark:text-white">{form.orgName}</div>
                                        <div className="text-xs text-gray-500">{form.orgType}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xs text-purple-600 font-bold">
                                                {form?.userId?.Fullname?.charAt(0) || 'U'}
                                            </div>
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{form?.userId?.Fullname || 'Unknown'}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm text-gray-700 dark:text-gray-300">{form.contactName}</div>
                                        <div className="text-xs text-gray-500">{form.email}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                            ${form.status === 'approved'
                                                ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900'
                                                : form.status === 'rejected'
                                                    ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900'
                                                    : 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900'
                                            }`}>
                                            {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(form.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-right flex justify-end gap-2">
                                        <button
                                            onClick={() => handleEdit(form)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                            title="Edit Form"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(form._id)}
                                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            title="Delete Form"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredForms.length === 0 && (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                            No forms found matching your search.
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Edit Form Modal */}
            {isEditModalOpen && editingForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Form</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                    <select
                                        value={editingForm.status}
                                        onChange={(e) => setEditingForm({ ...editingForm, status: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Org Type</label>
                                    <input
                                        type="text"
                                        value={editingForm.orgType}
                                        onChange={(e) => setEditingForm({ ...editingForm, orgType: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Organization Name</label>
                                <input
                                    type="text"
                                    value={editingForm.orgName}
                                    onChange={(e) => setEditingForm({ ...editingForm, orgName: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Name</label>
                                    <input
                                        type="text"
                                        value={editingForm.contactName}
                                        onChange={(e) => setEditingForm({ ...editingForm, contactName: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={editingForm.email}
                                        onChange={(e) => setEditingForm({ ...editingForm, email: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveForm}
                                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
