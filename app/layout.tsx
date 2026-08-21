import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { PublicNavbar } from "@/shared/components";
import { ThemeProvider } from "@/shared/components/theme-provider";
import { defaultMetadata } from "@/lib/seo";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"]
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"]
});

export const metadata: Metadata = defaultMetadata;

export default async function RootLayout({ children }: Readonly<{ children: ReactNode; }>) {
    const nonce = (await headers()).get("x-nonce");

    if (!nonce) {
        throw new Error("Missing CSP nonce");
    }

    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="min-h-full flex flex-col">
                <ThemeProvider nonce={nonce}>
                    <PublicNavbar />
                    {children}
                    <Toaster />
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
}
