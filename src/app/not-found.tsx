'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-lg mx-auto"
            >
                <div className="flex justify-center mb-6">
                    <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
                        <AlertCircle className="w-16 h-16 text-red-600 dark:text-red-400" />
                    </div>
                </div>

                <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tighter">
                    404
                </h1>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
                >
                    <Home className="w-5 h-5" />
                    Go Home
                </Link>
            </motion.div>
        </div>
    );
}
