import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProfileByUsername } from "@/features/profiles/db/get-profile-by-username";
import { ProfilePage } from "@/features/profiles/pages";
import { routes } from "@/shared/constants";

type ProfilePageProps = {
    params: Promise<{
        username: string;
    }>;
};

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
    const { username } = await params;
    const result = await getProfileByUsername(username);

    if (!result) {
        return {};
    }

    return {
        title: result.displayName,
        alternates: {
            canonical: routes.user(result.username)
        }
    };
}

export default async function Page({ params }: ProfilePageProps) {
    const { username } = await params;
    const result = await getProfileByUsername(username);

    if (!result) {
        notFound();
    }

    return <ProfilePage profile={result} />;
}
