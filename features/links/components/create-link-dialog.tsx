"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateLinkForm } from "@/features/links/components/create-link-form";

type CreateLinkDialogProps = {
    triggerLabel?: string;
};

export function CreateLinkDialog({triggerLabel = "Add link"}: CreateLinkDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger render={<Button size="sm" />}>
                <PlusIcon data-icon="inline-start" />
                {triggerLabel}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add link
                    </DialogTitle>
                    <DialogDescription>
                        Add a new link to your profile.
                    </DialogDescription>
                </DialogHeader>
                <div className="min-w-0">
                    <CreateLinkForm onSuccess={() => setOpen(false)} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
