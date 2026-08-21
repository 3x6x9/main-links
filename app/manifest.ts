import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo";
import { routes } from "@/shared/constants";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: siteConfig.name,
        short_name: siteConfig.name,
        description: siteConfig.description,
        start_url: routes.home,
        display: siteConfig.display,
        lang: siteConfig.language
    };
}
