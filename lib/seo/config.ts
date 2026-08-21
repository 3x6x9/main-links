import { env } from "@/lib/env";

export const siteConfig = {
    name: "mainLinks",
    description: "Manage your digital presence with mainLinks.",
    url: env.SITE_URL,
    locale: "en_US",
    language: "en",
    display: "standalone"
} as const;
