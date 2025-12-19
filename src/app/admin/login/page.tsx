'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
    const [loginData, setLoginData] = useState({
        Email: "",
        Password: ""
    })
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/users/login", loginData);
            // The API now returns the token in a cookie.
            // We just need to check if the user is actually an admin.
            // However, the frontend token is not easily accessible here without decoding.
            // We'll rely on the redirect. If they are admin, /admin works.
            // If they are NOT admin, the middleware will kick them out to /form.

            // Optional: Decode token client-side to check role before redirecting?
            // For now, let's just redirect and let middleware handle it.

            // Wait, we can check the response if we modified the API to return isAdmin.
            // But we didn't modify the LOGIN response body to include user role, only the token payload.
            // That's fine.
            // Dispatch event to update Navbar immediately
            const result = response.data.isAdmin;
            if (result) {
                window.dispatchEvent(new Event('auth-change'));
                router.push("/admin");
            } else {
                alert("You are not authorized to access this page");
                router.push("/");
            }

        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert(error.message || "Login failed");
            }
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
            >
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="mx-auto w-12 h-12 bg-purple-900/50 rounded-full flex items-center justify-center mb-4">
                            <ShieldCheck className="w-6 h-6 text-purple-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h2>
                        <p className="mt-2 text-sm text-gray-400">Authorized personnel only</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                                <input
                                    type="email"
                                    required
                                    value={loginData.Email}
                                    onChange={(e) => setLoginData({ ...loginData, Email: e.target.value })}
                                    className="w-full bg-gray-900/50 border border-gray-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block pl-10 p-2.5 placeholder-gray-500"
                                    placeholder="admin@ruralshores.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                                <input
                                    type="password"
                                    required
                                    value={loginData.Password}
                                    onChange={(e) => setLoginData({ ...loginData, Password: e.target.value })}
                                    className="w-full bg-gray-900/50 border border-gray-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block pl-10 p-2.5 placeholder-gray-500"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-2 transition-colors"
                        >
                            Access Dashboard <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>
                <div className="px-8 py-4 bg-gray-900/50 border-t border-gray-700 text-center">
                    <p className="text-xs text-gray-500">
                        Restricted Access. All activities are monitored.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
