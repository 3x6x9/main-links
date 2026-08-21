import type { Metadata } from "next";

import { PricingPage } from "@/features/pricing/pages";
import { routes } from "@/shared/constants";

export const metadata: Metadata = {
    title: "Pricing",
    description: "Simple, free pricing for managing your digital presence. Create and manage up to 10 links at no cost.",
    alternates: {
        canonical: routes.pricing
    }
};

export default function Page() {
    return <PricingPage />;
}
