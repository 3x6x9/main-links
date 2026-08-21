"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth/server";
import { createProfile } from "@/features/auth/db/create-profile";
import { signUpSchema, type SignUpInput } from "@/features/auth/schemas/sign-up";
import type { ActionResult } from "@/shared/types";
import { routes } from "@/shared/constants";

export async function signUpAction(input: SignUpInput): Promise<ActionResult> {
    const zInput = signUpSchema.safeParse(input);

    if (!zInput.success) {
        return {
            success: false,
            error: "Invalid input."
        };
    }

    const {username, email, password} = zInput.data;

    try {
        const response =
            await auth.api.signUpEmail({
                body: {
                    name: username,
                    username,
                    email,
                    password
                }
            });

        await createProfile({
            userId: response.user.id
        });
    } catch {
        return {
            success: false,
            error: "Something went wrong. Please try again."
        };
    }

    revalidatePath(routes.dashboard);

    return {
        success: true
    };
}
