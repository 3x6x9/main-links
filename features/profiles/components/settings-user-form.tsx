"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    updateUserSettingsSchema,
    type UpdateUserSettingsInput
} from "@/features/profiles/schemas/update-user";
import { updateUserSettingsAction } from "@/features/profiles/actions/update-user";

type SettingsUserFormProps = {
    email: string;
    username: string;
    displayName: string;
};

export function SettingsUserForm({ email, username, displayName }: SettingsUserFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<UpdateUserSettingsInput>({
        resolver: zodResolver(updateUserSettingsSchema),
        defaultValues: {
            username,
            displayName
        }
    });

    async function onSubmit(values: UpdateUserSettingsInput) {
        const result = await updateUserSettingsAction(values);

        if (!result.success) {
            toast.error(result.error);
            return;
        }

        toast.success("Account settings updated.");
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <div className="space-y-2">
                <Label htmlFor="username">
                    Username
                </Label>

                <Input
                    id="username"
                    type="text"
                    autoComplete="username"
                    maxLength={30}
                    placeholder="your_username"
                    aria-invalid={!!errors.username}
                    {...register("username")}
                />

                {errors.username && (
                    <p className="text-sm text-destructive">
                        {errors.username.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="displayName">
                    Display name
                </Label>

                <Input
                    id="displayName"
                    placeholder="Your name"
                    aria-invalid={!!errors.displayName}
                    {...register("displayName")}
                />

                {errors.displayName && (
                    <p className="text-sm text-destructive">
                        {errors.displayName.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">
                    Email
                </Label>

                <Input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                />
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
            >
                {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
        </form>
    );
}
