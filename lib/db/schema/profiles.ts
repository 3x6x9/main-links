//import "server-only";

import { sql } from "drizzle-orm";
import {
    pgTable,
    text,
    timestamp,
    uniqueIndex,
    check,
    integer,
    jsonb
} from "drizzle-orm/pg-core";

import type { AvatarConfig } from "@/features/profiles/avatar/config";
import { user } from "@/lib/db/schema/auth";

export const profile = pgTable(
    "profile",
    {
        id: text("id").primaryKey(),

        userId: text("user_id")
            .notNull()
            .references(() => user.id, {
                onDelete: "cascade"
            }),

        bio: text("bio"),

        avatarUrl: text("avatar_url"),

        avatarConfig: jsonb("avatar_config").$type<AvatarConfig>(),

        theme: text("theme")
            .notNull()
            .default("default"),

        linksCount: integer("links_count")
            .notNull()
            .default(0),

        createdAt: timestamp("created_at")
            .defaultNow()
            .notNull(),

        updatedAt: timestamp("updated_at")
            .defaultNow()
            .notNull()
    },
    (table) => [
        uniqueIndex("profile_user_id_unique").on(table.userId),
        check("profile_links_count_range", sql`${table.linksCount} >= 0 AND ${table.linksCount} <= 10`),
        check("profile_bio_length", sql`${table.bio} IS NULL OR char_length(${table.bio}) <= 200`)
    ]
);
