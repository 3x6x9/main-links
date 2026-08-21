import { Metadata } from "next";

import { SettingsPage } from "@/features/profiles/pages";

export const metadata: Metadata = {
    title: "Settings"
};

export default async function Page() {
    return <SettingsPage />;
}
