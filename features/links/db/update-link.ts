import "server-only";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { link } from "@/lib/db/schema";
import type { LinkIconName } from "@/shared/constants";

type UpdateLinkInput = {
    id: string;
    profileId: string;
    title: string;
    url: string;
    description?: string;
    icon: LinkIconName | null;
};

export async function updateLink({id, profileId, title, url, description, icon}: UpdateLinkInput) {
    const [updatedLink] = await db
        .update(link)
        .set({
            title,
            url,
            ...(description !== undefined ? {description: description || null} : {}),
            icon,
            updatedAt: new Date()
        })
        .where(
            and(
                eq(link.id, id),
                eq(link.profileId, profileId)
            )
        )
        .returning();

    return updatedLink;
}
