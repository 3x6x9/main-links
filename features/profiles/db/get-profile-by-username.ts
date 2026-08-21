import "server-only";

import { cache } from "react";
import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { user } from "@/lib/db/schema/auth";
import { link } from "@/lib/db/schema/links";

export const getProfileByUsername = cache(async (username: string) => {
        const result = await db.query.user.findFirst({
            where: eq(user.username, username),
            with: {
                profile: {
                    with: {
                        links: {
                            orderBy: [asc(link.position)]
                        }
                    }
                }
            }
        });

        if (!result?.profile) {
            return null;
        }

        return {
            displayName: result.name,
            username,
            bio: result.profile.bio,
            avatarConfig: result.profile.avatarConfig,
            links: result.profile.links
        };
    }
);
