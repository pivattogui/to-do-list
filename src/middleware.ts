import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
    matcher: "/([^.]*)",
};
export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
    })

    const url = req.nextUrl.clone()

    const { pathname } = url

    /* PAGINAS PUBLICAS */
    if (pathname.includes('/api/auth') || pathname.includes('/api/register') || pathname.includes('/api/public')) {
        return NextResponse.next()
    }

    if (!token && pathname !== '/login' && pathname !== '/register') {
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}