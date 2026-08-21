import { z } from "zod";

import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "@/shared/constants";

export const loginSchema = z.object({
    identifier: z.string().min(USERNAME_MIN_LENGTH, {
        message: "Email or username is required."
    }),

    password: z.string().min(PASSWORD_MIN_LENGTH, {
        message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`
    })
});

export type LoginInput = z.infer<typeof loginSchema>;
