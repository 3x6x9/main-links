import type { Metadata } from "next";
import { ReactNode } from "react";

import { requireSession } from "@/lib/auth/server/session";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false
    }
};

export default async function ProtectedLayout({ children }: Readonly<{ children: ReactNode; }>) {
    await requireSession();

    return children;
}
