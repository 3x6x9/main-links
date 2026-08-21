import "server-only";

import { and, eq, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { link, profile } from "@/lib/db/schema";
import { createUuid } from "@/shared/id";
import { LinkLimitReachedError } from "@/features/links/errors";
import type { LinkIconName } from "@/shared/constants/link-icons";

type CreateLinkInput = {
    profileId: string;
    title: string;
    url: string;
    description?: string;
    icon: LinkIconName | null;
    position: number;
};

export async function createLink({profileId, title, url, description, icon, position}: CreateLinkInput) {
    return db.transaction(async (tx) => {
        const [updatedProfile] = await tx
            .update(profile)
            .set({linksCount: sql`${profile.linksCount} + 1`
            })
            .where(
                and(
                    eq(profile.id, profileId),
                    sql`${profile.linksCount} < 10`
                )
            )
            .returning({linksCount: profile.linksCount});

        if (!updatedProfile) {
            throw new LinkLimitReachedError();
        }

        const [createdLink] = await tx
            .insert(link)
            .values({
                id: createUuid(),
                profileId,
                title,
                url,
                description: description ?? null,
                icon,
                position
            })
            .returning();

        return createdLink;
    });
}
