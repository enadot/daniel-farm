import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Run i18n middleware on everything EXCEPT api, _next, _vercel, the
  // admin panel, and files with extensions (images etc.).
  matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)'],
};
