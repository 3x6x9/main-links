import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Links } from "@/features/links/types";
import { LinkActions } from "@/features/links/components/link-actions";
import { LinkIcon } from "@/features/links/components/link-icon";

type LinkItemProps = {
    link: Links;
};

export function LinkItem({link}: LinkItemProps) {
    return (
        <Card>
            <CardContent className="flex items-center justify-between gap-4 p-4">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center">
                        <LinkIcon icon={link.icon} size={20} />
                    </div>
                    <div className="min-w-0">
                        <p className="wrap-break-word font-medium">
                            {link.title}
                        </p>
                        <p className="wrap-break-word text-sm text-muted-foreground">
                            {link.description}
                        </p>
                        <p className="wrap-break-word text-sm text-muted-foreground">
                            {link.url}
                        </p>
                    </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                    <Link
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(buttonVariants({variant: "ghost", size: "icon-sm"}))}
                    >
                        <ExternalLinkIcon />
                        <span className="sr-only">Open link</span>
                    </Link>
                    <LinkActions link={link} />
                </div>
            </CardContent>
        </Card>
    );
}
