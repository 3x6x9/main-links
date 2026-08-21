//import "server-only";

import { sql } from "drizzle-orm";
import { check, integer, pgEnum, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

import { linkIconNames } from "@/shared/constants";
import { profile } from "@/lib/db/schema/profiles";

export const linkIconEnum = pgEnum("link_icon", linkIconNames);

export const link = pgTable(
    "link",
    {
        id: text("id").primaryKey(),

        profileId: text("profile_id")
            .notNull()
            .references(() => profile.id, {onDelete: "cascade"}),

        title: text("title").notNull(),

        url: text("url").notNull(),

        description: text("description"),

        icon: linkIconEnum("icon"),

        position: integer("position")
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
        uniqueIndex("link_profile_position_unique").on(
            table.profileId,
            table.position
        ),
        check("link_description_length", sql`${table.description} IS NULL OR char_length(${table.description}) <= 100`),
        check("link_position_range", sql`${table.position} >= 0`)
    ]
);
