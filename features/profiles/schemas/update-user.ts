import { z } from "zod";

import { USERNAME_MIN_LENGTH } from "@/shared/constants";

export const updateUserSettingsSchema = z.object({
    username: z.string().min(USERNAME_MIN_LENGTH, "Username is required."),

    // 3–30 characters
    // allowed characters
    // normalization
    // reserved usernames
    // uniqueness
    // ---> handled by better auth username plugin

    displayName: z
        .string()
        .trim()
        .min(1, "Display name is required.")
        .max(50, "Display name is too long.")
});

export type UpdateUserSettingsInput = z.infer<typeof updateUserSettingsSchema>;
