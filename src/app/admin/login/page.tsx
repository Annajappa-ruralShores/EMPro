'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-gray-900/5 dark:ring-white/10"
            >
                {/* Admin Header Strip */}
                <div className="bg-brand p-4">
                    <div className="flex justify-center">
                        <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                            Admin Portal
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Secure access for administrators only
                        </p>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300"
                            >
                                Admin ID / Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="admin@ruralshores.com"
                                    className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 pl-10 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent dark:bg-gray-800 dark:text-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 pl-10 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent dark:bg-gray-800 dark:text-white transition-all"
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            className="w-full h-10 bg-brand hover:bg-brand/90 text-white font-medium rounded-md flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand/30"
                        >
                            Access Dashboard <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            <Link href="/login" className="hover:text-brand dark:hover:text-brand/80 underline underline-offset-2">
                                Return to User Login
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
