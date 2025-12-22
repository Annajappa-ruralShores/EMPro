'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User as UserIcon, Building2, ChevronDown, ShieldCheck, UserCircle, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

import Image from 'next/image';
import CompanyLogo from '@/app/assets/company_logo.png';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface NavbarProps {
    username?: string;
    userImage?: string; // Optional URL for user image
}

export default function Navbar({ username = "Guest", userImage }: NavbarProps) {
    const [currentUsername, setCurrentUsername] = useState(username);
    // Force re-render on mount to check auth

    useEffect(() => {
        checkUser();

        // Listen for custom event 'auth-change'
        const handleAuthChange = () => checkUser();
        window.addEventListener('auth-change', handleAuthChange);
        return () => window.removeEventListener('auth-change', handleAuthChange);
    }, []);

    const checkUser = async () => {
        try {
            const res = await axios.get('/api/users/me');
            if (res.data.data) {
                setCurrentUsername(res.data.data.Fullname);
            }
        } catch (e) {
            setCurrentUsername("Guest");
        }
    }

    const isLoggedIn = currentUsername !== "Guest";
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter()

    const handleLogout = async () => {
        try {
            const response = await axios.get("/api/users/logout")
            if (response.status === 200) {
                setCurrentUsername("Guest");
                // Dispatch event to update other components if needed
                window.dispatchEvent(new Event('auth-change'));
                toast.success("Logout successful");
                router.push("/login")
            }

        } catch (error) {
            console.log(error)
        }
    }

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
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="relative h-12 w-auto" // Adjust height as needed
                        >
                            <Image
                                src={CompanyLogo}
                                alt="RuralShores Logo"
                                height={48} // 12 * 4 = 48px to match h-12 roughly
                                width={120} // Approximate aspect ratio, adjust as needed
                                className="object-contain h-full w-auto"
                                priority
                            />
                        </motion.div>
                    </Link>

                    {/* Right Side: Profile & Actions */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        {isLoggedIn ? (
                            <>
                                <div className="flex items-center gap-3">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Welcome,</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                                            {currentUsername}
                                        </p>
                                    </div>

                                    <Link href="/profile" className="relative group">
                                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden ring-2 ring-transparent group-hover:ring-brand transition-all">
                                            {userImage ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={userImage}
                                                    alt={username}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center" onClick={() => router.push("/profile")}>
                                                    <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-brand dark:group-hover:text-brand transition-colors" />
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            // Guest / Login Dropdown
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    // Also support hover for desktop if desired, but click is better for touch
                                    className="flex items-center gap-2 px-4 py-2 bg-brand hover:bg-brand/90 text-white rounded-lg shadow-md transition-colors font-medium text-sm"
                                >
                                    Log in
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden z-50"
                                        >
                                            <div className="p-1">
                                                <Link
                                                    href="/login"
                                                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                >
                                                    <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg dark:bg-blue-900/30 dark:text-blue-400">
                                                        <UserCircle className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold block">User Login</span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">Access your account</span>
                                                    </div>
                                                </Link>
                                                <Link
                                                    href="/support"
                                                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                >
                                                    <div className="p-1.5 bg-green-100 text-green-600 rounded-lg dark:bg-green-900/30 dark:text-green-400">
                                                        <HelpCircle className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold block">Help & Support</span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">Need assistance?</span>
                                                    </div>
                                                </Link>

                                                <div className="h-px bg-gray-100 dark:bg-gray-700 my-1"></div>

                                                <Link
                                                    href="/admin/login"
                                                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                >
                                                    <div className="p-1.5 bg-purple-100 text-purple-600 rounded-lg dark:bg-purple-900/30 dark:text-purple-400">
                                                        <ShieldCheck className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold block">Admin Login</span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">Management console</span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
