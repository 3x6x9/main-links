"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth/server";
import { loginSchema, type LoginInput } from "@/features/auth/schemas/login";
import type { ActionResult } from "@/shared/types";
import { routes } from "@/shared/constants";

export async function loginAction(input: LoginInput): Promise<ActionResult> {
    const zInput = loginSchema.safeParse(input);

    if (!zInput.success) {
        return {
            success: false,
            error: "Invalid input."
        };
    }

    const { identifier, password } = zInput.data;

    try {
        if (identifier.includes("@")) {
            await auth.api.signInEmail({
                body: {
                    email: identifier,
                    password
                }
            });
        } else {
            await auth.api.signInUsername({
                body: {
                    username: identifier,
                    password
                }
            });
        }
    } catch {
        return {
            success: false,
            error: "Invalid email/username or password."
        };
    }

    revalidatePath(routes.dashboard);

    return {
        success: true
    };
}
