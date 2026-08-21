import {
    SiDiscord,
    SiFacebook,
    SiGithub,
    SiGoogle,
    SiInstagram,
    SiReddit,
    SiSpotify,
    SiTiktok,
    SiTwitch,
    SiX,
    SiYoutube
} from "@icons-pack/react-simple-icons";
import { GlobeIcon } from "lucide-react";

import { type LinkIconName, linkIconNames } from "@/shared/constants";

type LinkIconProps = {
    icon: string | null;
    size?: number;
};

const linkIcons = {
    discord: SiDiscord,
    facebook: SiFacebook,
    github: SiGithub,
    google: SiGoogle,
    instagram: SiInstagram,
    reddit: SiReddit,
    spotify: SiSpotify,
    tiktok: SiTiktok,
    twitch: SiTwitch,
    x: SiX,
    youtube: SiYoutube
} satisfies Record<LinkIconName, unknown>;

function isLinkIconName(value: string): value is LinkIconName {
    return linkIconNames.includes(value as LinkIconName);
}

export function LinkIcon({icon, size = 20}: LinkIconProps) {
    if (!icon || !isLinkIconName(icon)) {
        return <GlobeIcon size={size} />;
    }

    const Icon = linkIcons[icon];

    return <Icon size={size} />;
}
