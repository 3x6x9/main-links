import "server-only";

import { db } from "@/lib/db";
import { profile } from "@/lib/db/schema";
import { createUuid } from "@/shared/id";

type CreateProfileInput = {
    userId: string;
};

export async function createProfile({ userId }: CreateProfileInput) {
    await db.insert(profile).values({
        id: createUuid(),
        userId
    });
}
