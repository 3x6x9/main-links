import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { profile } from "@/lib/db/schema";
import type { AvatarConfig } from "@/features/profiles/avatar/config";

type UpdateProfileInput = {
    profileId: string;
    bio: string | null;
    avatarConfig: AvatarConfig | null;
};

export async function updateProfile({profileId, bio, avatarConfig}: UpdateProfileInput) {
    await db
        .update(profile)
        .set({
            bio,
            avatarConfig,
            updatedAt: new Date()
        })
        .where(eq(profile.id, profileId));
}
