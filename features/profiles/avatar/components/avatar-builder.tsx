"use client";

import { Dices } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { avatarStyles, type AvatarConfig, type AvatarStyle } from "@/features/profiles/avatar/config";
import { generateAvatar } from "@/features/profiles/avatar/generate-avatar";
import { createUuid } from "@/shared/id";

type AvatarBuilderProps = {
    value: AvatarConfig | null;
    onChange: (value: AvatarConfig | null) => void;
};

const avatarStyleLabels: Record<AvatarStyle, string> = {
    lorelei: "Lorelei",
    "lorelei-neutral": "Lorelei Neutral",
    notionists: "Notionists",
    "notionists-neutral": "Notionists Neutral",
    "open-peeps": "Open Peeps",
    "pixel-art": "Pixel Art",
    "pixel-art-neutral": "Pixel Art Neutral",
    shapes: "Shapes",
    thumbs: "Thumbs",
    rings: "Rings",
    identicon: "Identicon"
};

export function AvatarBuilder({value, onChange}: AvatarBuilderProps) {
    function handleStyleChange(style: AvatarStyle) {
        if (!value) {
            onChange({style, seed: createUuid()});

            return;
        }

        onChange({...value, style});
    }

    function handleRandomize() {
        onChange({
            style: value?.style ?? avatarStyles[0],
            seed: createUuid()
        });
    }

    function handleNoAvatar() {
        onChange(null);
    }

    const avatarUrl = value ? generateAvatar(value) : null;

    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <h2 className="text-base font-medium">
                    Avatar
                </h2>
                <p className="text-sm text-muted-foreground">
                    Choose an avatar or create a random one.
                </p>
            </div>
            <div className="flex flex-col items-center gap-5 rounded-lg border p-5 sm:flex-row sm:items-start">
                <div className="flex size-32 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
                    {
                        avatarUrl ? (
                            <Image
                                src={avatarUrl}
                                alt="Avatar preview"
                                width={128}
                                height={128}
                                className="size-full object-cover"
                                unoptimized
                            />
                        ) : (
                            <span className="px-4 text-center text-sm text-muted-foreground">No avatar</span>
                        )
                    }
                </div>
                <div className="w-full space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="avatar-style">
                            Style
                        </Label>
                        <Select
                            value={value?.style ?? ""}
                            onValueChange={(style) => handleStyleChange(style as AvatarStyle)}
                        >
                            <SelectTrigger id="avatar-style">
                                <SelectValue placeholder="Choose a style" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    avatarStyles.map((style) => (
                                        <SelectItem
                                            key={style}
                                            value={style}
                                        >
                                            {avatarStyleLabels[style]}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleRandomize}
                        >
                            <Dices />
                            Randomize
                        </Button>
                        {
                            value && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={handleNoAvatar}
                                >
                                    No avatar
                                </Button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
