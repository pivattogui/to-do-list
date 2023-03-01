import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
    matcher: "/([^.]*)",
};
export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.SECRET || "", secureCookie: process.env.NEXTAUTH_URL?.startsWith('https://') ?? process.env.VERCEL_ENV === "preview"
    })

    const url = req.nextUrl.clone()

    const { pathname } = url

    /* PAGINAS PUBLICAS */
    if (pathname.includes('/api/auth') || pathname.includes('/public')) {
        return NextResponse.next()
    }

    if (!token && pathname !== '/login') {
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}