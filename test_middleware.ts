import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const ADMIN_ROUTES = ['/admin/category'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Token yoksa login'e yönlendir
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Backend ile aynı secret key kullanılmalı
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const isAdmin = decoded.roles?.includes('ADMIN') || decoded.role === 'ADMIN';

    if (ADMIN_ROUTES.some(path => request.nextUrl.pathname.startsWith(path))) {
      if (!isAdmin) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }

    return NextResponse.next();

  } catch (err) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};