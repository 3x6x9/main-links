"use server";

import { revalidatePath } from "next/cache";

import { getCurrentSession } from "@/lib/auth/server";
import { getProfileByUserId } from "@/features/profiles/db/get-profile-by-user-id";
import { createLink } from "@/features/links/db/create-link";
import { getLinksByProfileId } from "@/features/links/db/get-links-by-profile-id";
import { createLinkSchema, type CreateLinkInput } from "@/features/links/schema/create-link";
import { LinkLimitReachedError } from "@/features/links/errors";
import { detectLinkIcon } from "@/features/links/lib/detect-link-icon";
import { routes } from "@/shared/constants";

export async function createLinkAction(input: CreateLinkInput) {
    const zInput = createLinkSchema.safeParse(input);

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

    try {
        const existingLinks = await getLinksByProfileId(profile.id);

        const position =
            existingLinks.length === 0 ? 0 :
                Math.max(...existingLinks.map((link) => link.position)) + 1;

        const icon = detectLinkIcon(zInput.data.url);

        await createLink({
            profileId: profile.id,
            title: zInput.data.title,
            url: zInput.data.url,
            ...(zInput.data.description ? {description: zInput.data.description} : {}),
            icon,
            position
        });

        revalidatePath(routes.dashboard);

        return {
            success: true
        };
    } catch (error) {
        if (error instanceof LinkLimitReachedError) {
            return {
                success: false,
                error: "You can have up to 10 links."
            };
        }
        return {
            success: false,
            error: "Something went wrong."
        };
    }
}
