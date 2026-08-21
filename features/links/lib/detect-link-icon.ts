import type { LinkIconName } from "@/shared/constants";

const hostnameIcons: Record<string, LinkIconName> = {
    // Discord
    "discord.com": "discord",

    // Facebook
    "facebook.com": "facebook",

    // GitHub
    "github.com": "github",

    // Google
    "google.com": "google",
    "google.com.au": "google",
    "google.ca": "google",
    "google.co.uk": "google",
    "google.de": "google",
    "google.fr": "google",
    "google.it": "google",
    "google.co.jp": "google",
    "google.nl": "google",
    "google.pl": "google",
    "google.es": "google",
    "google.in": "google",
    "google.br": "google",

    // Instagram
    "instagram.com": "instagram",

    // Reddit
    "reddit.com": "reddit",

    // Spotify
    "spotify.com": "spotify",

    // TikTok
    "tiktok.com": "tiktok",

    // Twitch
    "twitch.tv": "twitch",

    // X / Twitter
    "twitter.com": "x",
    "x.com": "x",

    // YouTube
    "youtube.com": "youtube"
} as const;

export type LinkIcon = (typeof hostnameIcons)[keyof typeof hostnameIcons];

function normalizeHostname(hostname: string) {
    return hostname.toLowerCase().replace(/^www\./, "");
}

export function detectLinkIcon(url: string): LinkIcon | null {
    try {
        const parsedUrl = new URL(url);
        const hostname = normalizeHostname(parsedUrl.hostname);

        return hostnameIcons[hostname as keyof typeof hostnameIcons] ?? null;
    } catch {
        return null;
    }
}
