import Link from "next/link";

import { ThemeToggle } from "@/shared/components/theme-toggle";
import { getCurrentSession } from "@/lib/auth/server";
import { UserMenu } from "@/shared/components/user-menu";
import { PublicMenu } from "@/shared/components/public-menu";
import { routes } from "@/shared/constants";

export async function PublicNavbar() {
    const session = await getCurrentSession();

    return (
        <header className="border-b">
            <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link
                    href={session ? routes.dashboard : routes.home}
                    className="font-semibold"
                >
                    mainLinks
                </Link>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    {session ? <UserMenu username={session.user.username} /> : <PublicMenu />}
                </div>
            </nav>
        </header>
    );
}
