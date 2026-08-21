import "server-only";

import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { link } from "@/lib/db/schema";

export async function getLinksByProfileId(profileId: string) {
    return db.query.link.findMany({
        where: eq(link.profileId, profileId),
        orderBy: [asc(link.position)]
    });
}
