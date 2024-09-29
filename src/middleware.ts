import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;

    const accessToken = cookies().get("accessToken")?.value;

    if(!accessToken){
        return NextResponse.redirect(new URL("/login"))
    }

    // let decodedToken = null;

    // decodedToken = jwtVerify(accessToken);
    // const {role}= decodedToken;
    
    // if(role === "admin" && pathname === "admin-dashboard"){
    //     return NextResponse.next();
    // }


  return NextResponse.redirect(new URL('/', request.url))
}
 
export const config = {
  matcher: ['/about'],
}

// export const config = {
//   matcher: ['/dashboard/:page*', '/admin-dashboard/:page*', '/user-dashboard/:page*'],
// }