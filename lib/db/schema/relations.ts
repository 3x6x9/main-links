import { relations } from "drizzle-orm";

import { user, session, account } from "@/lib/db/schema/auth";
import { profile } from "@/lib/db/schema/profiles";
import { link } from "@/lib/db/schema/links";

export const userRelations = relations(user, ({ many, one }) => ({
    sessions: many(session),
    accounts: many(account),
    profile: one(profile)
}));

export const sessionRelations = relations(session, ({ one }) => ({
    user: one(user, {
        fields: [session.userId],
        references: [user.id]
    })
}));

export const accountRelations = relations(account, ({ one }) => ({
    user: one(user, {
        fields: [account.userId],
        references: [user.id]
    })
}));

export const profileRelations = relations(profile, ({ one, many }) => ({
    user: one(user, {
        fields: [profile.userId],
        references: [user.id]
    }),
    links: many(link)
}));

export const linkRelations = relations(link, ({ one }) => ({
    profile: one(profile, {
        fields: [link.profileId],
        references: [profile.id]
    })
}));
