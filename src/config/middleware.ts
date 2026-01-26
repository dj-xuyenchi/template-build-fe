// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/register'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const isPublic = PUBLIC_PATHS.includes(request.nextUrl.pathname);

    if (!token && !isPublic) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Nếu cần: kiểm tra hạn token ở đây (giải mã JWT nếu muốn)
    return NextResponse.next();
}
export const config = {
    matcher: ['/((?!_next|favicon.ico).*)'], // áp dụng cho mọi path trừ static files
};
