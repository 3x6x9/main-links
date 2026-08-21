import "server-only";

import { env } from "@/lib/env";

export function applySecurityHeaders(response: Response) {
    response.headers.set(
        "X-Content-Type-Options",
        "nosniff"
    );

    response.headers.set(
        "X-Frame-Options",
        "DENY"
    );

    response.headers.set(
        "Referrer-Policy",
        "strict-origin-when-cross-origin"
    );

    response.headers.set(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=()"
    );

    if (env.NODE_ENV === "production") {
        response.headers.set(
            "Strict-Transport-Security",
            "max-age=63072000; includeSubDomains; preload"
        );
    }
}
