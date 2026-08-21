import type { Metadata } from "next";

import { siteConfig } from "@/lib/seo/config";

export const defaultMetadata: Metadata = {
    metadataBase: new URL(siteConfig.url),

    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`
    },

    description: siteConfig.description,

    applicationName: siteConfig.name,

    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1
        }
    },

    openGraph: {
        type: "website",
        siteName: siteConfig.name,
        locale: siteConfig.locale,
        title: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url
    },

    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description
    },

    manifest: "/manifest.webmanifest"
};
