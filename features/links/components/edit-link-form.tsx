"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LinkIcon } from "@/features/links/components/link-icon";
import { updateLinkAction } from "@/features/links/actions/update-link";
import { type UpdateLinkInput, updateLinkSchema } from "@/features/links/schema/update-link";
import { linkIconNames, type LinkIconName } from "@/shared/constants/link-icons";
import { LINK_DESCRIPTION_MAX_LENGTH } from "@/shared/constants";

type EditLinkFormProps = {
    link: {
        id: string;
        title: string;
        url: string;
        description: string | null;
        icon: UpdateLinkInput["icon"];
    };
    onSuccess: () => void;
};

const linkIconLabels: Record<LinkIconName, string> = {
    discord: "Discord",
    facebook: "Facebook",
    github: "GitHub",
    google: "Google",
    instagram: "Instagram",
    reddit: "Reddit",
    spotify: "Spotify",
    tiktok: "TikTok",
    twitch: "Twitch",
    x: "X",
    youtube: "YouTube"
};

export function EditLinkForm({link, onSuccess}: EditLinkFormProps) {
    const {control, register, handleSubmit, formState: {errors, isSubmitting}} = useForm<UpdateLinkInput>(
        {
            resolver: zodResolver(updateLinkSchema),
            defaultValues: {
                title: link.title,
                url: link.url,
                description: link.description ?? "",
                icon: link.icon
            }
        }
    );

    async function onSubmit(values: UpdateLinkInput) {
        const result = await updateLinkAction({id: link.id, ...values});

        if (!result.success) {
            toast.error(result.error);
            return;
        }

        toast.success("Link updated.");
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
                <Label htmlFor="icon"> Icon </Label>
                <Controller
                    control={control}
                    name="icon"
                    render={({field}) => (
                        <Select
                            value={field.value ?? "none"}
                            onValueChange={(value) => {
                                field.onChange(value === "none" ? null : value);
                            }}
                        >
                            <SelectTrigger
                                id="icon"
                                aria-invalid={!!errors.icon}
                                className="w-full"
                            >
                                <SelectValue placeholder="Select an icon">
                                    {
                                        field.value ?
                                            (<span>{linkIconLabels[field.value]}</span>) :
                                            (<span>{"Default"}</span>)
                                    }
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent align="start" className="max-h-72" alignItemWithTrigger={false}>
                                <SelectItem value="none">
                                    Default
                                </SelectItem>
                                {
                                    linkIconNames.map((icon) => (
                                        <SelectItem
                                            key={icon}
                                            value={icon}
                                        >
                                            <LinkIcon
                                                icon={icon}
                                                size={18}
                                            />
                                            <span className="capitalize">{linkIconLabels[icon]}</span>
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.icon && (<p className="text-sm text-destructive"> {errors.icon.message} </p>)}
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
                {isSubmitting ? "Saving changes..." : "Save changes"}
            </Button>
        </form>
    );
}
