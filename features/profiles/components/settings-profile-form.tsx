"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useController } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { AvatarConfig } from "@/features/profiles/avatar/config";
import { AvatarBuilder } from "@/features/profiles/avatar/components/avatar-builder";
import {
    updateProfileSchema,
    type UpdateProfileInput
} from "@/features/profiles/schemas/update-profile";
import { updateProfileAction } from "@/features/profiles/actions/update-profile";

type SettingsProfileFormProps = {
    bio: string | null;
    avatarConfig: AvatarConfig | null;
};

export function SettingsProfileForm({ bio, avatarConfig }: SettingsProfileFormProps) {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<UpdateProfileInput>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            bio: bio ?? "",
            avatarConfig
        }
    });

    const { field: avatarField } = useController({ name: "avatarConfig", control });

    async function onSubmit(values: UpdateProfileInput) {
        const result = await updateProfileAction(values);

        if (!result.success) {
            toast.error(result.error);
            return;
        }

        toast.success("Profile updated.");
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <AvatarBuilder
                value={avatarField.value}
                onChange={avatarField.onChange}
            />

            <div className="space-y-2">
                <Label htmlFor="bio">
                    Bio
                </Label>
                <Textarea
                    id="bio"
                    placeholder="Tell people a little about yourself..."
                    maxLength={200}
                    aria-invalid={!!errors.bio}
                    {...register("bio")}
                />
                {errors.bio && (
                    <p className="text-sm text-destructive">
                        {errors.bio.message}
                    </p>
                )}
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
