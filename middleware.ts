import type {NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {

    const access_token = request.cookies.get("access_token");
    const role = request.cookies.get("role");
    const path = request.nextUrl.pathname;
    const origin = request.nextUrl.origin

    // protect login and signup 
    // if (access_token && path.startsWith("/auth")) {
    //   if(role !== "Admin"){
    //     return NextResponse.redirect(origin);
    //   }else{
    //     return NextResponse.redirect(origin+"/admin/dashboard");
    //   }
    // }

    // protect admin from no token 
    if (!access_token && path.startsWith('/admin')) {
        return NextResponse.redirect(origin);
    }
    
    // protect admin from simple user 
    if (access_token && role !== "Admin" && path.startsWith('/admin')) {
        return NextResponse.redirect(origin);
    }

}