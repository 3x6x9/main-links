import type { Metadata } from "next";

import { LandingPage } from "@/features/marketing/pages";
import { routes } from "@/shared/constants";

export const metadata: Metadata = {
    title: "Manage Your Digital Presence",
    alternates: {
        canonical: routes.home
    }
};

export default function Page() {
    return <LandingPage />;
}
