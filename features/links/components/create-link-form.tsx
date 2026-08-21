"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createLinkSchema, type CreateLinkInput } from "@/features/links/schema/create-link";
import { createLinkAction } from "@/features/links/actions/create-link";
import { LINK_DESCRIPTION_MAX_LENGTH } from "@/shared/constants";

type CreateLinkFormProps = {
    onSuccess: () => void;
};

export function CreateLinkForm({onSuccess}: CreateLinkFormProps) {
    const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm<CreateLinkInput>(
        {
            resolver: zodResolver(createLinkSchema),
            defaultValues: {
                title: "",
                url: "",
                description: ""
            }
        }
    );

    async function onSubmit(values: CreateLinkInput) {
        const result = await createLinkAction(values);

        if (!result.success) {
            toast.error(result.error);
            return;
        }

        toast.success("Link created.");

        reset();
        onSuccess();
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <div className="space-y-2">
                <Label htmlFor="title">
                    Title
                </Label>
                <Input
                    id="title"
                    placeholder="My website"
                    aria-invalid={!!errors.title}
                    {...register("title")}
                />
                {errors.title && (
                    <p className="text-sm text-destructive">
                        {errors.title.message}
                    </p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="url">
                    URL
                </Label>
                <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    aria-invalid={!!errors.url}
                    {...register("url")}
                />
                {errors.url && (
                    <p className="text-sm text-destructive">
                        {errors.url.message}
                    </p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">
                    Description
                </Label>
                <Textarea
                    id="description"
                    placeholder="Optional description"
                    aria-invalid={!!errors.description}
                    maxLength={LINK_DESCRIPTION_MAX_LENGTH}
                    {...register("description")}
                />
                {errors.description && (
                    <p className="text-sm text-destructive">
                        {errors.description.message}
                    </p>
                )}
            </div>
            <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Adding link..." : "Add link"}
            </Button>
        </form>
    );
}
