import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// We'll use a simpler approach without directly verifying JWT tokens in middleware
// Instead, we'll just check if the cookie exists and let client-side auth handle the rest
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public routes accessible to all
  const publicRoutes = ['/', '/login', '/signup', '/about'];
  
  // User routes (requires authentication)
  const userRoutes = ['/input', '/report', '/results', '/ai-estimation'];
  
  // Admin routes (requires admin role)
  const adminRoutes = ['/admin'];
  
  // Get access token from cookies - we'll just check if it exists
  const hasAuthCookie = request.cookies.has('access_token');
  
  // For admin routes, let the component handle the access check
  // For user routes, just check if they have a token
  
  // Check if route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }
  
  // Check if user is trying to access protected routes
  if ([...userRoutes, ...adminRoutes].includes(pathname)) {
    if (!hasAuthCookie) {
      // Not authenticated, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // User has auth cookie, let client-side auth handle role validation
    return NextResponse.next();
  }
  
  // For any other route, continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
