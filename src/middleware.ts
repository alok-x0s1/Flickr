import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request });
	const url = request.nextUrl;

	if (
		token &&
		(url.pathname === "/sign-in" ||
			url.pathname === "/verify" ||
			url.pathname === "/sign-up")
	) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (!token && url.pathname === "/dashboard") {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/sign-in",
		"/sign-up",
		"/",
		"/verify/:path*",
		"/dashboard/:path*",
	],
};

export { default } from "next-auth/middleware";
