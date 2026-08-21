import { Link as LinkIcon } from "lucide-react";

import { LinkItem } from "@/features/links/components/link-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateLinkDialog } from "@/features/links/components/create-link-dialog";
import type { LinkIconName } from "@/shared/constants";

type LinkItem = {
    id: string;
    title: string;
    url: string;
    description: string | null;
    icon: LinkIconName | null;
    position: number;
};

type LinksSectionProps = {
    links: LinkItem[];
};

export function LinksSection({links}: LinksSectionProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle>
                    Your links
                </CardTitle>
                <CreateLinkDialog />
            </CardHeader>
            <CardContent>
                {links.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                        <LinkIcon className="size-8 text-muted-foreground" />
                        <div className="space-y-1">
                            <p className="font-medium">
                                No links yet
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Add your first link to start building
                                your profile.
                            </p>
                        </div>
                        <CreateLinkDialog triggerLabel="Add your first link" />
                    </div>
                ) : (
                    <div className="space-y-3">
                        {
                            links.map((item) => (
                                <LinkItem
                                    key={item.id}
                                    link={item}
                                />
                            ))
                        }
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
