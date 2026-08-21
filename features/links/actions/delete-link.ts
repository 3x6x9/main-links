"use server";

import { revalidatePath } from "next/cache";

import { getCurrentSession } from "@/lib/auth/server";
import { deleteLink } from "@/features/links/db/delete-link";
import { getProfileByUserId } from "@/features/profiles/db/get-profile-by-user-id";
import { routes } from "@/shared/constants";

export async function deleteLinkAction(linkId: string) {
    const session = await getCurrentSession();

    if (!session) {
        return {
            success: false,
            error: "Unauthorized."
        };
    }

    const userProfile = await getProfileByUserId(session.user.id);

    if (!userProfile) {
        return {
            success: false,
            error: "Profile not found."
        };
    }

    await deleteLink({linkId, profileId: userProfile.id});

    revalidatePath(routes.dashboard);

    return {
        success: true
    };
}
