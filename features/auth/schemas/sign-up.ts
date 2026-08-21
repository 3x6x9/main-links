import { z } from "zod";

import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "@/shared/constants";

export const signUpSchema = z.object({
    username: z.string().min(USERNAME_MIN_LENGTH, {
        message: "Username is required."
    }),

    email: z.email({
        message: "Please enter a valid email address."
    }),

    password: z.string().min(PASSWORD_MIN_LENGTH, {
        message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`
    })
});

export type SignUpInput = z.infer<typeof signUpSchema>;
