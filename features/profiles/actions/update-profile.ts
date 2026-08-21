"use server";

import { revalidatePath } from "next/cache";

import { getCurrentSession } from "@/lib/auth/server";
import type { ActionResult } from "@/shared/types";

import { getProfileByUserId } from "@/features/profiles/db/get-profile-by-user-id";
import { updateProfile } from "@/features/profiles/db/update-profile";
import {
    updateProfileSchema,
    type UpdateProfileInput
} from "@/features/profiles/schemas/update-profile";
import { routes } from "@/shared/constants";

export async function updateProfileAction(input: UpdateProfileInput): Promise<ActionResult> {
    const zInput = updateProfileSchema.safeParse(input);

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

    const profile = await getProfileByUserId(session.user.id);

    if (!profile) {
        return {
            success: false,
            error: "Profile not found."
        };
    }

    await updateProfile({
        profileId: profile.id,
        bio: zInput.data.bio || null,
        avatarConfig: zInput.data.avatarConfig
    });

    revalidatePath(routes.settings);
    revalidatePath(routes.dashboard);
    revalidatePath(routes.user(session.user.username));


    return {
        success: true
    };
}
