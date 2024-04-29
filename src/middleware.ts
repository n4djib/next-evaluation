// export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: ["/profile"],
};

// export const config = {
//   matcher: ["/admin/:path*"],
//   // matcher: ["/dashboard", "/profile"],
// };

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log({ token });

  // const aaa = request.nextUrl;
  // const searchParams = aaa.searchParams.getAll("ppp");

  // console.log("\n\n--------", aaa);
  // console.log("\n\n--------", searchParams);

  // console.log("----getToken::::", JSON.stringify(token, null, 2));

  // if (token && (token as any).roles.includes("admin")) {
  // return NextResponse.next();
  // }

  if (token?.user) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/auth/signin", request.url));
  // return NextResponse.rewrite(new URL('/about', request.url))
}
