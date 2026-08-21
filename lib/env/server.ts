//import "server-only"

import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.url(),
    SITE_URL: z.url(),
    NODE_ENV: z
        .enum([
            "development",
            "test",
            "production"
        ])
        .default("development")
});

export const env = envSchema.parse(process.env);

export type Env = typeof env;
