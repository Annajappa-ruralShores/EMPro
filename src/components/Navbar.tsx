'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { LogOut, User as UserIcon, Building2 } from 'lucide-react';

interface NavbarProps {
    username?: string;
    userImage?: string; // Optional URL for user image
}

export default function Navbar({ username = "Guest", userImage }: NavbarProps) {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left Side: Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-indigo-600 rounded-lg group-hover:bg-indigo-700 transition-colors">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                            RuralShores
                        </span>
                    </Link>

                    {/* Right Side: Profile & Actions */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Welcome,</p>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                                    {username}
                                </p>
                            </div>

                            <Link href="/profile" className="relative group">
                                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden ring-2 ring-transparent group-hover:ring-indigo-500 transition-all">
                                    {userImage ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={userImage}
                                            alt={username}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center">
                                            <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </div>

                        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

                        <button
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
