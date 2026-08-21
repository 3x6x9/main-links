"use client";

import { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = {
    children: ReactNode;
    nonce: string;
};

export function ThemeProvider({children, nonce}: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            nonce={nonce}
        >
            {children}
        </NextThemesProvider>
    );
}
