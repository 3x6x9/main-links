import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { LinkIcon } from "@/features/links/components/link-icon";
import type { AvatarConfig } from "@/features/profiles/avatar/config";
import { generateAvatar } from "@/features/profiles/avatar/generate-avatar";

type ProfilePageProps = {
    profile: {
        displayName: string;
        username: string;
        bio: string | null;
        //avatarUrl: string | null;
        avatarConfig: AvatarConfig | null;
        links: {
            id: string;
            title: string;
            url: string;
            description: string | null;
            icon: string | null;
        }[];
    };
};

export function ProfilePage({profile}: ProfilePageProps) {
    const avatar = profile.avatarConfig ? generateAvatar(profile.avatarConfig) : null;

    return (
        <main>
            <div className="mx-auto w-full max-w-xl px-4 py-10">
                <div className="text-center">
                    {
                        avatar && (
                            <Image
                                src={avatar}
                                alt={`${profile.displayName}'s avatar`}
                                width={96}
                                height={96}
                                className="mx-auto rounded-full mb-3"
                                unoptimized
                            />
                        )
                    }
                    <h1 className="text-3xl font-bold tracking-tight wrap-break-word">
                        {profile.displayName}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        @{profile.username}
                    </p>
                    {
                        profile.bio && (
                            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground wrap-break-word">
                                {profile.bio}
                            </p>
                        )
                    }
                </div>
                <div className="mt-8 flex w-full flex-col gap-3">
                    {
                        profile.links.map((link) => (
                            <Card
                                key={link.id}
                                className="transition-colors hover:bg-muted"
                            >
                                <CardContent>
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4"
                                    >
                                        <div className="flex size-9 shrink-0 items-center justify-center">
                                            <LinkIcon icon={link.icon} size={20} />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="wrap-break-word font-medium">
                                                {link.title}
                                            </div>
                                            {
                                                link.description && (
                                                    <div className="mt-1 wrap-break-word text-sm text-muted-foreground">
                                                        {link.description}
                                                    </div>
                                                )
                                            }
                                            <div className="mt-1 truncate text-sm text-muted-foreground">
                                                {link.url}
                                            </div>
                                        </div>
                                    </a>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </main>
    );
}
