"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { auth, getCurrentSession } from "@/lib/auth/server";
import {
    updateUserSettingsSchema,
    type UpdateUserSettingsInput
} from "@/features/profiles/schemas/update-user";
import type { ActionResult } from "@/shared/types";
import { routes } from "@/shared/constants";

export async function updateUserSettingsAction(input: UpdateUserSettingsInput): Promise<ActionResult> {
    const zInput = updateUserSettingsSchema.safeParse(input);

    if (!zInput.success) {
        return {
            success: false,
            error: "Invalid profile information."
        };
    }

    const session = await getCurrentSession();

    if (!session) {
        return {
            success: false,
            error: "Unauthorized."
        };
    }

    const { username, displayName } = zInput.data;

    try {
        await auth.api.updateUser({
            headers: await headers(),
            body: {
                username,
                name: displayName
            }
        });
    } catch {
        return {
            success: false,
            error: "Unable to update your profile information."
        };
    }

    revalidatePath(routes.settings);
    revalidatePath(routes.dashboard);

    return {
        success: true
    };
}
