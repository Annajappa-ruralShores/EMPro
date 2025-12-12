'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
    const pathname = usePathname();

    // Define routes where Navbar should be visible
    const showNavbarRoutes = ['/profile', '/form', '/', '/login', '/signup', '/admin/login', '/forgot-password', '/admin'];

    // Check if current path starts with any of the allowed routes
    // Using startsWith to handle sub-routes if any (e.g., /profile/settings)
    const shouldShowNavbar = showNavbarRoutes.some(route => pathname.startsWith(route));

    const getMockUser = () => {
        if (pathname.startsWith('/admin') && !pathname.includes('login')) return 'Admin';
        if (pathname.startsWith('/profile') || pathname.startsWith('/form')) return 'User';
        return 'Guest'; // Default for login, signup, home
    };

    if (!shouldShowNavbar) {
        return null;
    }

    return <Navbar username={getMockUser()} />;
}
