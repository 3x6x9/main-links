import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: true
    }
};

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({children}: AuthLayoutProps) {
    return children;
}
