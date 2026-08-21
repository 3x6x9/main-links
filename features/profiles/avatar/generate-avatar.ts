import { Avatar, Style } from "@dicebear/core";
import lorelei from "@dicebear/styles/lorelei.json" with { type: "json" };
import loreleiNeutral from "@dicebear/styles/lorelei-neutral.json" with { type: "json", };
import notionists from "@dicebear/styles/notionists.json" with { type: "json" };
import notionistsNeutral from "@dicebear/styles/notionists-neutral.json" with { type: "json", };
import openPeeps from "@dicebear/styles/open-peeps.json" with { type: "json" };
import pixelArt from "@dicebear/styles/pixel-art.json" with { type: "json" };
import pixelArtNeutral from "@dicebear/styles/pixel-art-neutral.json" with { type: "json", };
import shapes from "@dicebear/styles/shapes.json" with { type: "json" };
import thumbs from "@dicebear/styles/thumbs.json" with { type: "json" };
import bottts from "@dicebear/styles/bottts.json" with { type: "json" };
import rings from "@dicebear/styles/rings.json" with { type: "json" };
import identicon from "@dicebear/styles/identicon.json" with { type: "json" };

import type { AvatarConfig } from "@/features/profiles/avatar/config";

const avatarStyles = {
    lorelei,
    "lorelei-neutral": loreleiNeutral,
    notionists,
    "notionists-neutral": notionistsNeutral,
    "open-peeps": openPeeps,
    "pixel-art": pixelArt,
    "pixel-art-neutral": pixelArtNeutral,
    shapes,
    thumbs,
    bottts,
    rings,
    identicon
} as const;

export function generateAvatar(config: AvatarConfig): string {
    const style = new Style(avatarStyles[config.style]);
    const avatar = new Avatar(style, {seed: config.seed});

    return avatar.toDataUri();
}
