import type { Metadata } from "next";

import { SignupPage } from "@/features/auth/pages";

export const metadata: Metadata = {
    title: "Sign up"
};

export default function Page() {
    return <SignupPage />;
}
