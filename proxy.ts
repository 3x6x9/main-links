import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { createCsp, applySecurityHeaders } from "@/lib/security";
import { createUuid } from "@/shared/id";

export function proxy(request: NextRequest) {
    const nonce = Buffer.from(createUuid()).toString("base64");
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-nonce", nonce);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders
        }
    });
    response.headers.set("Content-Security-Policy", createCsp(nonce));
    applySecurityHeaders(response);

    return response;
}

export const config = {
    matcher: [{ source: "/((?!_next/static|_next/image|favicon.ico).*)" }]
};
