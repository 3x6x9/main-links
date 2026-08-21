// import "server-only";

import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import { betterAuth } from "better-auth";

import * as schema from "@/lib/db/schema";
import { db } from "@/lib/db";
import { env } from "@/lib/env";
import { RESERVED_USERNAMES } from "@/shared/constants";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema
    }),

    disabledPaths: ["/is-username-available"],

    plugins: [
        username({
            usernameValidator: (username) => {
                return !RESERVED_USERNAMES.includes(username);
            }
        }),
        nextCookies() // make sure this is the last plugin in the array
    ],

    emailAndPassword: {
        enabled: true
    },

    secret: env.BETTER_AUTH_SECRET,

    baseURL: env.BETTER_AUTH_URL
});
