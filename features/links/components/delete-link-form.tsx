"use client"

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { deleteLinkAction } from "@/features/links/actions/delete-link";

type DeleteLinkDialogProps = {
    linkId: string;
    onSuccess: () => void;
};

const DeleteLinkForm = ({linkId, onSuccess}: DeleteLinkDialogProps) => {
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        setIsDeleting(true);

        const result = await deleteLinkAction(linkId);

        setIsDeleting(false);

        if (!result.success) {
            toast.error(result.error);
            return;
        }

        toast.success("Link deleted.");
        onSuccess();
    }

    return (
        <>
            <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full"
            >
                {isDeleting ? "Deleting..." : "Delete"}
            </Button>
        </>
    )
}

export default DeleteLinkForm;
