import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { profile } from "@/lib/db/schema";

export async function getProfileByUserId(userId: string) {
    return db.query.profile.findFirst({
        where: eq(profile.userId, userId)
    });
}
