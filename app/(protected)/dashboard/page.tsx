import type { Metadata } from "next";

import { DashboardPage } from "@/features/dashboard/pages";

export const metadata: Metadata = {
    title: "Dashboard"
};

export default function Page() {
    return <DashboardPage />;
}
