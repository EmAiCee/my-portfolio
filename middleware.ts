import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const secret = new TextEncoder().encode(JWT_SECRET);

// Define public paths that don't require authentication
const publicPaths = ['/admin/login', '/admin/page'];
const publicApiPaths = ['/api/auth/login', '/api/contact', '/api/auth/check', '/api/auth/logout'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  
  console.log('🔵 Middleware - Path:', pathname);
  console.log('🔵 Middleware - Method:', request.method);
  console.log('🔵 Middleware - Token exists:', !!token);
  
  // Allow public paths
  if (publicPaths.some(path => pathname === path) || 
      publicApiPaths.some(path => pathname.startsWith(path))) {
    console.log('✅ Middleware - Public path, allowing');
    return NextResponse.next();
  }
  
  // ✅ ALLOW public GET requests to /api/projects
  if (pathname === '/api/projects' && request.method === 'GET') {
    console.log('✅ Middleware - Public GET to projects, allowing');
    return NextResponse.next();
  }
  
  // Check if it's an admin route or protected API
  const isAdminRoute = pathname.startsWith('/admin');
  const isProtectedApi = pathname.startsWith('/api/projects') || 
                         pathname.startsWith('/api/messages');
  
  if (isAdminRoute || isProtectedApi) {
    if (!token) {
      console.log('❌ Middleware - No token found, redirecting to login');
      if (isAdminRoute) {
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    try {
      // Verify token using jose (works in Edge runtime)
      const { payload } = await jwtVerify(token, secret);
      console.log('✅ Middleware - Token valid for:', payload.email);
      return NextResponse.next();
    } catch (error) {
      console.log('❌ Middleware - Invalid token:', error.message);
      if (isAdminRoute) {
        const loginUrl = new URL('/admin/login', request.url);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete('token');
        return response;
      }
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};