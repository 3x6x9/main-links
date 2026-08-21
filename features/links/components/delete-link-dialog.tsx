import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import DeleteLinkForm from "@/features/links/components/delete-link-form";

type DeleteLinkDialogProps = {
    linkId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function DeleteLinkDialog({linkId, open, onOpenChange}: DeleteLinkDialogProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Delete link?
                    </DialogTitle>
                    <DialogDescription>
                        This action cannot be undone.
                        The link will permanently be removed.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DeleteLinkForm
                        linkId={linkId}
                        onSuccess={() => onOpenChange(false)}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
