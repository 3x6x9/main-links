"use client";

import { useState } from "react";
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EditLinkDialog } from "@/features/links/components/edit-link-dialog";
import { DeleteLinkDialog } from "@/features/links/components/delete-link-dialog";
import type { LinkIconName } from "@/shared/constants";

type LinkActionsProps = {
    link: {
        id: string;
        title: string;
        url: string;
        description: string | null;
        icon: LinkIconName | null;
    };
};

export function LinkActions({link}: LinkActionsProps) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label="Link actions"
                        />
                    }
                >
                    <MoreHorizontalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setEditOpen(true)}>
                        <PencilIcon />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setDeleteOpen(true)}
                    >
                        <Trash2Icon />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <EditLinkDialog
                link={link}
                open={editOpen}
                onOpenChange={setEditOpen}
            />
            <DeleteLinkDialog
                linkId={link.id}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
            />
        </>
    );
}
