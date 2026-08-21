import "server-only";

import { and, eq, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { link, profile } from "@/lib/db/schema";

type DeleteLinkInput = {
    linkId: string;
    profileId: string;
};

export async function deleteLink({linkId, profileId}: DeleteLinkInput) {
    return db.transaction(async (tx) => {
        const [deletedLink] = await tx
            .delete(link)
            .where(
                and(
                    eq(link.id, linkId),
                    eq(link.profileId, profileId)
                )
            )
            .returning({id: link.id});

        if (!deletedLink) {
            return false;
        }

        await tx
            .update(profile)
            .set({linksCount: sql`${profile.linksCount} - 1`})
            .where(eq(profile.id, profileId));

        return true;
    });
}
