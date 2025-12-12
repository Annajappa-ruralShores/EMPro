'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function LoadingPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-4"
            >
                <div className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-xl ring-1 ring-gray-900/5 dark:ring-white/10">
                    <Loader2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-spin" />
                </div>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-500 dark:text-gray-400 font-medium text-sm tracking-wide uppercase"
                >
                    Loading...
                </motion.p>
            </motion.div>
        </div>
    );
}
