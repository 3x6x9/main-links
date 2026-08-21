import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo";
import { routes } from "@/shared/constants";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: routes.home,
            disallow: [
                routes.dashboard,
                routes.settings
            ]
        },
        sitemap: `${siteConfig.url}/sitemap.xml`
    };
}
