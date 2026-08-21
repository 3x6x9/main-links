import type { LinkIconName } from "@/shared/constants";

export type Links = {
    id: string;
    title: string;
    url: string;
    description: string | null;
    position: number;
    icon: LinkIconName | null;
};
