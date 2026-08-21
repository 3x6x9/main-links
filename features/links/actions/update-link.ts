"use server";

import { revalidatePath } from "next/cache";

import { getCurrentSession } from "@/lib/auth/server";
import { updateLink } from "@/features/links/db/update-link";
import { getProfileByUserId } from "@/features/profiles/db/get-profile-by-user-id";
import { updateLinkSchema, type UpdateLinkInput } from "@/features/links/schema/update-link";
import { routes } from "@/shared/constants";

type UpdateLinkActionInput =
    UpdateLinkInput & {
    id: string;
};

export async function updateLinkAction(input: UpdateLinkActionInput) {
    const zInput = updateLinkSchema.safeParse(input);

    if (!zInput.success) {
        return {
            success: false,
            error: "Invalid input."
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

    const updatedLink =
        await updateLink({
            id: input.id,
            profileId: profile.id,
            title: zInput.data.title,
            url: zInput.data.url,
            ...(zInput.data.description !== undefined ? {description: zInput.data.description} : {}),
            icon: zInput.data.icon
        });

    if (!updatedLink) {
        return {
            success: false,
            error: "Link not found."
        };
    }

    revalidatePath(routes.dashboard);

    return {
        success: true
    };
}
