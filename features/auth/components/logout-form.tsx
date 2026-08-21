"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { logoutAction } from "@/features/auth/actions/logout";
import { routes } from "@/shared/constants";

export function LogoutForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    function handleSubmit() {
        startTransition(async () => {
            const result = await logoutAction();

            if (!result.success) {
                toast.error(result.error);
                return;
            }

            router.replace(routes.home);
            router.refresh();
        });
    }

    return (
        <form action={handleSubmit}>
            <Button
                type="submit"
                variant="destructive"
                className="w-full justify-start items-center"
                disabled={isPending}
            >
                <LogOutIcon />
                {isPending ? "Signing out" : "Sign out"}
            </Button>
        </form>
    );
}
