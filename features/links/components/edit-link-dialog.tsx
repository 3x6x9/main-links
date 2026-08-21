import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EditLinkForm } from "@/features/links/components/edit-link-form";
import type { LinkIconName } from "@/shared/constants";

type EditLinkDialogProps = {
    link: {
        id: string;
        title: string;
        url: string;
        description: string | null;
        icon: LinkIconName | null;
    };
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function EditLinkDialog({link, open, onOpenChange}: EditLinkDialogProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit link
                    </DialogTitle>
                    <DialogDescription>
                        Update the title, URL, description, or icon of your link.
                    </DialogDescription>
                </DialogHeader>
                <div className="min-w-0">
                    <EditLinkForm
                        link={link}
                        onSuccess={() => onOpenChange(false)}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
