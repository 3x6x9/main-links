import "server-only";

import { env } from "@/lib/env";

export function createCsp(nonce: string) {
    return [
        "default-src 'self'",

        [
            "script-src",
            "'self'",
            `'nonce-${nonce}'`,
            "https://va.vercel-scripts.com",
            ...(env.NODE_ENV === "development" ? ["'unsafe-eval'"] : [])
        ].join(" "),

        [
            "style-src",
            "'self'",
            "'unsafe-inline'"
        ].join(" "),

        "img-src 'self' data: blob:",

        "font-src 'self'",

        "connect-src 'self'",

        "frame-ancestors 'none'",

        "form-action 'self'",

        "base-uri 'self'",

        "object-src 'none'",

        "upgrade-insecure-requests"
    ].join("; ");
}
