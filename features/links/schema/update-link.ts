import { z } from "zod";

import { linkIconNames } from "@/shared/constants";
import {
    LINK_DESCRIPTION_MAX_LENGTH,
    LINK_TITLE_MAX_LENGTH,
    LINK_TITLE_MIN_LENGTH,
    LINK_URL_MAX_LENGTH
} from "@/shared/constants";

const linkIconSchema = z.enum(linkIconNames);

export const updateLinkSchema = z.object({
    title: z
        .string()
        .min(LINK_TITLE_MIN_LENGTH, {message: "Title is required."})
        .max(LINK_TITLE_MAX_LENGTH, {message: `Title cannot exceed ${LINK_TITLE_MAX_LENGTH} characters.`}),
    url: z
        .url({message: "Please enter a valid URL."})
        .max(LINK_URL_MAX_LENGTH, {message: `URL cannot exceed ${LINK_URL_MAX_LENGTH} characters.`}),
    description: z
        .string()
        .max(LINK_DESCRIPTION_MAX_LENGTH, {message: `Description cannot exceed ${LINK_DESCRIPTION_MAX_LENGTH} characters.`})
        .optional(),
    icon: linkIconSchema.nullable()
});

export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;
