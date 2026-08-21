export const linkIconNames = [
    "discord",
    "facebook",
    "github",
    "google",
    "instagram",
    "reddit",
    "spotify",
    "tiktok",
    "twitch",
    "x",
    "youtube"
] as const;

export type LinkIconName = (typeof linkIconNames)[number];
