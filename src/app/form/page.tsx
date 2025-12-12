'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Calendar, Building2, MapPin, Globe, Phone, Mail, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import Modal from '@/components/Modal';

export default function OrganizationForm() {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    // Initial State
    const initialFormData = {
        orgName: '',
        orgType: '',
        regNumber: '',
        foundedDate: '',
        branch: '',
        country: '',
        state: '',
        contactName: '',
        contactNumber: '',
        email: '',
        status: 'pending',
        services: [] as string[],
        address: '',
        description: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({ ...prev, services: options }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleCancel = () => {
        if (confirm('Are you sure you want to clear the form?')) {
            setFormData(initialFormData);
            setFileName(null);
        }
    };

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        setIsPreviewOpen(true);
    };

    const handleSave = () => {
        // Here you would save to database
        console.log('Saving Data to DB:', { ...formData, fileName });
        alert('Data saved successfully! (Check console)');
        setIsPreviewOpen(false);
        setFormData(initialFormData);
        setFileName(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto"
            >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden ring-1 ring-gray-900/5 dark:ring-white/10">
                    <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Organization Registration
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Please fill in the details to register your organization.
                        </p>
                    </div>

                    <form onSubmit={handleConfirm} className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Organization Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Organization Name</label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <input required name="orgName" value={formData.orgName} onChange={handleChange} type="text" placeholder="Acme Corp" className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 pl-10 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent dark:bg-gray-800 dark:text-white" />
                                </div>
                            </div>

                            {/* Organization Type */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Organization Type</label>
                                <select required name="orgType" value={formData.orgType} onChange={handleChange} className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent dark:bg-gray-800">
                                    <option value="">Select Type</option>
                                    <option value="private">Private Limited</option>
                                    <option value="public">Public Limited</option>
                                    <option value="ngo">NGO</option>
                                    <option value="partnership">Partnership</option>
                                </select>
                            </div>

                            {/* Registration Number */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Registration Number</label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <input required name="regNumber" value={formData.regNumber} onChange={handleChange} type="text" placeholder="REG-1234-5678" className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 pl-10 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent dark:bg-gray-800 dark:text-white" />
                                </div>
                            </div>

                            {/* Founded Date */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Founded Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <input required name="foundedDate" value={formData.foundedDate} onChange={handleChange} type="date" className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 pl-10 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent dark:bg-gray-800" />
                                </div>
                            </div>

                            {/* Branch */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Branch</label>
                                <select required name="branch" value={formData.branch} onChange={handleChange} className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent dark:bg-gray-800">
                                    <option value="">Select Branch</option>
                                    <option value="main">Main Branch</option>
                                    <option value="sub">Sub Branch</option>
                                </select>
                            </div>

                            {/* Country */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <select required name="country" value={formData.country} onChange={handleChange} className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent dark:bg-gray-800">
                                        <option value="">Select Country</option>
                                        <option value="usa">United States</option>
                                        <option value="uk">United Kingdom</option>
                                        <option value="india">India</option>
                                        <option value="canada">Canada</option>
                                    </select>
                                </div>
                            </div>

                            {/* State */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <select required name="state" value={formData.state} onChange={handleChange} className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent dark:bg-gray-800">
                                        <option value="">Select State</option>
                                        <option value="ny">New York</option>
                                        <option value="ca">California</option>
                                        <option value="dl">Delhi</option>
                                        <option value="mh">Maharashtra</option>
                                    </select>
                                </div>
                            </div>

                            {/* Contact Person Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Contact Person Name</label>
                                <input required name="contactName" value={formData.contactName} onChange={handleChange} type="text" placeholder="John Doe" className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent dark:bg-gray-800 dark:text-white" />
                            </div>

                            {/* Contact Number */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Contact Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <input required name="contactNumber" value={formData.contactNumber} onChange={handleChange} type="tel" placeholder="+1 (555) 000-0000" className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 pl-10 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent dark:bg-gray-800 dark:text-white" />
                                </div>
                            </div>

                            {/* Email Address */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="contact@company.com" className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 pl-10 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent dark:bg-gray-800 dark:text-white" />
                                </div>
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                                <div className="relative">
                                    <CheckCircle2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <select name="status" value={formData.status} onChange={handleChange} className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent dark:bg-gray-800">
                                        <option value="pending">Pending</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            {/* Services / Activities */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Services / Activities</label>
                                <select multiple name="services" value={formData.services} onChange={handleMultiSelectChange} className="flex min-h-[42px] h-auto w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent dark:bg-gray-800">
                                    <option value="it">IT Services</option>
                                    <option value="consulting">Consulting</option>
                                    <option value="manufacturing">Manufacturing</option>
                                    <option value="education">Education</option>
                                    <option value="healthcare">Healthcare</option>
                                </select>
                                <p className="text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</p>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {/* Location / Address */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location / Address</label>
                                <textarea required name="address" value={formData.address} onChange={handleChange} rows={4} placeholder="1234 Main St, Suite 100..." className="flex w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent dark:bg-gray-800 dark:text-white resize-none" />
                            </div>

                            {/* Organization Description */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Organization Description</label>
                                <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Brief description about the organization..." className="flex w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent dark:bg-gray-800 dark:text-white resize-none" />
                            </div>
                        </div>

                        {/* Upload Documents / Logo */}
                        <div className="mt-8">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Upload Documents / Logo</label>
                            <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 transition-colors hover:border-brand dark:hover:border-brand group cursor-pointer bg-gray-50 dark:bg-gray-800/50 relative">
                                <div className="flex flex-col items-center justify-center text-center">
                                    <div className="p-3 bg-brand/10 dark:bg-brand/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                                        <Upload className="h-6 w-6 text-brand dark:text-brand/80" />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {fileName || "Click to upload or drag and drop"}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            SVG, PNG, JPG or GIF (max. 800x400px)
                                        </p>
                                    </div>
                                </div>
                                <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            </div>
                        </div>


                        <div className="mt-8 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-brand hover:bg-brand/90 text-white font-medium rounded-lg shadow-lg shadow-brand/20 dark:shadow-brand/30 transition-all hover:scale-105"
                            >
                                Confirm Details
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>

            {/* Preview Modal */}
            <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} title="Confirm Organization Details">
                <div className="space-y-6">
                    <div className="bg-brand/10 dark:bg-brand/20 p-4 rounded-lg flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-brand dark:text-brand/80 shrink-0 mt-0.5" />
                        <p className="text-sm text-brand/90 dark:text-brand/70">
                            Please review all details carefully before saving.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                        <div><span className="font-semibold text-gray-500 dark:text-gray-400 block">Organization Name</span> {formData.orgName}</div>
                        <div><span className="font-semibold text-gray-500 dark:text-gray-400 block">Type</span> {formData.orgType}</div>
                        <div><span className="font-semibold text-gray-500 dark:text-gray-400 block">Registration No.</span> {formData.regNumber}</div>
                        <div><span className="font-semibold text-gray-500 dark:text-gray-400 block">Founded Date</span> {formData.foundedDate}</div>
                        <div><span className="font-semibold text-gray-500 dark:text-gray-400 block">Branch</span> {formData.branch}</div>
                        <div><span className="font-semibold text-gray-500 dark:text-gray-400 block">Country</span> {formData.country}</div>
                        <div><span className="font-semibold text-gray-500 dark:text-gray-400 block">State</span> {formData.state}</div>
                        <div><span className="font-semibold text-gray-500 dark:text-gray-400 block">Contact Name</span> {formData.contactName}</div>
                        <div><span className="font-semibold text-gray-500 dark:text-gray-400 block">Contact Number</span> {formData.contactNumber}</div>
                        <div><span className="font-semibold text-gray-500 dark:text-gray-400 block">Email</span> {formData.email}</div>
                        <div><span className="font-semibold text-gray-500 dark:text-gray-400 block">Status</span> {formData.status}</div>
                        <div><span className="font-semibold text-gray-500 dark:text-gray-400 block">Services</span> {formData.services.join(', ')}</div>
                    </div>

                    <div>
                        <span className="font-semibold text-gray-500 dark:text-gray-400 block text-sm">Address</span>
                        <p className="text-sm mt-1">{formData.address}</p>
                    </div>

                    <div>
                        <span className="font-semibold text-gray-500 dark:text-gray-400 block text-sm">Description</span>
                        <p className="text-sm mt-1">{formData.description}</p>
                    </div>

                    <div>
                        <span className="font-semibold text-gray-500 dark:text-gray-400 block text-sm">Uploaded Document</span>
                        <p className="text-sm mt-1 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            {fileName || "No file uploaded"}
                        </p>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => setIsPreviewOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-brand hover:bg-brand/90 text-white font-medium rounded-lg shadow-lg shadow-brand/20 dark:shadow-brand/30 transition-all hover:scale-105"
                        >
                            Save Data
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
