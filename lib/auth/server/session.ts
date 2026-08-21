import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/server/auth";
import { routes } from "@/shared/constants";

type AuthSession = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;

export type CurrentSession = Omit<AuthSession, "user"> & {
    user: Omit<AuthSession["user"], "username"> & {
        username: string;
    };
};

export const getCurrentSession = cache(
    async (): Promise<CurrentSession | null> => {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return null;
        }

        if (!session.user.username) {
            throw new Error("Authenticated user is missing a username.");
        }

        return session as CurrentSession;
    }
);

export const requireSession = cache(async (): Promise<CurrentSession> => {
    const session = await getCurrentSession();

    if (!session) {
        redirect(routes.signin);
    }

    return session;
});
