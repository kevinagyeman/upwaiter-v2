import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const protectedRoutes = ['/waiter', '/company'];
const authRestrictedRoutes = ['/login', '/register'];
const authCookieKey = 'stack-refresh-38782efa-7067-43ea-9d91-cbd1e45e5623';

export default function middleware(req: NextRequest) {
  const token = req.cookies.get(authCookieKey)?.value;
  const pathname = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRestrictedRoute = authRestrictedRoutes.includes(pathname);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isAuthRestrictedRoute && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return createMiddleware(routing)(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
