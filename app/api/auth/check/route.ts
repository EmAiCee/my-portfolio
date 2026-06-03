import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const secret = new TextEncoder().encode(JWT_SECRET);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    
    console.log('Auth check - Token exists:', !!token);
    
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }
    
    try {
      const { payload } = await jwtVerify(token.value, secret);
      console.log('Auth check - Token valid for:', payload.email);
      return NextResponse.json({ 
        authenticated: true, 
        user: { email: payload.email, name: payload.name }
      }, { status: 200 });
    } catch (error) {
      console.log('Auth check - Invalid token');
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}