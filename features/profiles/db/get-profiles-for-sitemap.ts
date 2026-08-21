import "server-only";

import { eq, isNotNull, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { user, profile, link } from "@/lib/db/schema";

export async function getProfilesForSitemap() {
    const rows = await db
        .select({
            username: user.username,
            updatedAt: sql<Date>`
                GREATEST(
                    ${user.updatedAt},
                    ${profile.updatedAt},
                    COALESCE(
                        MAX(${link.updatedAt}),
                        ${profile.updatedAt}
                    )
                )
            `.as("updatedAt")
        })
        .from(user)
        .innerJoin(profile, eq(profile.userId, user.id))
        .leftJoin(link, eq(link.profileId, profile.id))
        .where(isNotNull(user.username))
        .groupBy(profile.id, user.username, user.updatedAt);

    return rows.map((row) => ({
        username: row.username!,
        updatedAt: row.updatedAt
    }));
}
