'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
    const pathname = usePathname();

    // Define routes where Navbar should be visible
    const showNavbarRoutes = ['/profile', '/form'];

    // Check if current path starts with any of the allowed routes
    // Using startsWith to handle sub-routes if any (e.g., /profile/settings)
    const shouldShowNavbar = showNavbarRoutes.some(route => pathname.startsWith(route));

    if (!shouldShowNavbar) {
        return null;
    }

    return <Navbar username="User" />;
}
