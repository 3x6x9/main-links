import { z } from "zod";

import { avatarStyles } from "@/features/profiles/avatar/config";

const avatarStyleSchema = z.enum(avatarStyles);

const avatarConfigSchema = z.object({
    style: avatarStyleSchema,
    seed: z.string().trim().min(1).max(100)
});

export const updateProfileSchema = z.object({
    bio: z.string().max(200),

    avatarConfig: avatarConfigSchema.nullable()
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
