import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Define public paths that don't need authentication
    const publicPaths = ['/login', '/signup', '/verifyemail', '/', '/admin/login'];
    const isPublicPath = publicPaths.includes(path);

    // Get the token from cookies
    const token = request.cookies.get('token')?.value || ''

    // Decode token to check for admin privileges
    let isAdmin = false;
    if (token) {
        try {
            // Base64Url to Base64 (handle - and _ replacement)
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(atob(base64));
            isAdmin = payload.isAdmin === true;
        } catch (e) {
            // Token invalid or decode failed, isAdmin remains false
        }
    }

    // 3. Admin Route Protection (Strict Isolation)
    if (path.startsWith('/admin')) {
        // ALLOW access to login page if not logged in
        if (path === '/admin/login' && !token) {
            return NextResponse.next();
        }

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.nextUrl));
        }

        // Decode token to check role
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const payload = JSON.parse(jsonPayload);

            // If NOT admin
            if (!payload.isAdmin) {
                // If trying to access admin pages, kick to user form
                return NextResponse.redirect(new URL('/form', request.nextUrl));
            }

            // If Admin is logged in and tries to go to login page, send to dashboard
            if (path === '/admin/login' && payload.isAdmin) {
                return NextResponse.redirect(new URL('/admin', request.nextUrl));
            }

        } catch (e) {
            // If token is invalid and we are on login page, let them in to re-login
            if (path === '/admin/login') {
                return NextResponse.next();
            }
            // Otherwise, redirect to login
            return NextResponse.redirect(new URL('/admin/login', request.nextUrl));
        }
    }

    // 4. User Route Protection
    const publicUserRoutes = ['/form', '/profile'];

    // Check if logged-in Admin is trying to access user routes
    // explicitly exclude /admin paths to avoid infinite loop
    const isUserRoute = path === '/' || publicUserRoutes.some(r => path.startsWith(r));

    if (token && isUserRoute && !path.startsWith('/admin')) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(atob(base64));

            if (payload.isAdmin) {
                return NextResponse.redirect(new URL('/admin', request.nextUrl));
            }
        } catch (e) {
            // ignore
        }
    }

    // If user is logged in (has token) and visits login/signup
    if (isPublicPath && token) {
        if (path === '/') return NextResponse.next();

        // If we are here, we know it's a public path like /login or /signup
        if (!path.startsWith('/admin')) {
            if (isAdmin) {
                return NextResponse.redirect(new URL('/admin', request.nextUrl));
            }
            return NextResponse.redirect(new URL('/form', request.nextUrl));
        }
    }

    // If user is NOT logged in and visits a protected page
    if (!isPublicPath && !token) {
        if (!path.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/login', request.nextUrl))
        }
    }
}

// Configure which paths the middleware runs on
export const config = {
    matcher: [
        '/',
        '/form',
        '/form/:path*',
        '/login',
        '/signup',
        '/verifyemail',
        '/admin/:path*',
        '/profile/:path*',
        '/admin/login'
    ]
}
