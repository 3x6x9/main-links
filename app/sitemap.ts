// 50k+ items && generateSitemaps()

import type { MetadataRoute } from "next";

import { getProfilesForSitemap } from "@/features/profiles/db/get-profiles-for-sitemap";
import { routes } from "@/shared/constants";
import { siteConfig } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const result = await getProfilesForSitemap();

    return [
        {
            url: new URL(routes.home, siteConfig.url).toString(),
            lastModified: new Date()
        },
        {
            url: new URL(routes.pricing, siteConfig.url).toString(),
            lastModified: new Date()
        },

        ...result.map((publicProfile) => ({
            url: new URL(
                routes.user(publicProfile.username),
                siteConfig.url
            ).toString(),
            lastModified: publicProfile.updatedAt
        }))
    ];
}
