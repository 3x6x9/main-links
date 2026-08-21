export const avatarStyles = [
    "lorelei",
    "lorelei-neutral",
    "notionists",
    "notionists-neutral",
    "open-peeps",
    "pixel-art",
    "pixel-art-neutral",
    "shapes",
    "thumbs",
    "rings",
    "identicon"
] as const;

export type AvatarStyle = (typeof avatarStyles)[number];

export type AvatarConfig = {
    style: AvatarStyle;
    seed: string;
};
