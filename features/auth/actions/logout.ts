"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth/server";
import type { ActionResult } from "@/shared/types";
import { routes } from "@/shared/constants";

export async function logoutAction(): Promise<ActionResult> {
    try {
        await auth.api.signOut({
            headers: await headers()
        });
    } catch {
        return {
            success: false,
            error: "Unable to sign out."
        };
    }

    revalidatePath(routes.home);

    return {
        success: true
    };
}
