import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { getCurrentSession } from "@/lib/auth/server";
import { getProfileByUserId } from "@/features/profiles/db/get-profile-by-user-id";
import { getLinksByProfileId } from "@/features/links/db/get-links-by-profile-id";
import { LinksSection } from "@/features/links/components/links-section";
import { PageContainer } from "@/shared/components";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/shared/constants";

export async function DashboardPage() {
    const session = await getCurrentSession();
    const profile = session && await getProfileByUserId(session.user.id);
    const links = profile && await getLinksByProfileId(profile.id);

    return (
        <PageContainer className="py-10">
            <div className="mx-auto max-w-2xl space-y-8">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Dashboard
                    </p>
                    <h1 className="wrap-break-word mt-1 text-3xl font-bold tracking-tight">
                        Welcome back, {session?.user.name}
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Manage your profile and links.
                    </p>
                </div>
                {
                    session && (
                        <Link
                            href={routes.user(session.user.username)}
                            className={cn(buttonVariants({variant: "link"}))}
                        >
                            <ExternalLinkIcon />
                            View your public profile page
                        </Link>
                    )
                }
                {
                    links && (
                        <LinksSection links={links} />
                    )
                }
            </div>
        </PageContainer>
    );
}
