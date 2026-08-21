import Link from "next/link";

import { Button } from "@/components/ui/button";
import { routes } from "@/shared/constants";

interface GetStartedButtonProps {
    classNameButton?: string;
    classNameLink?: string;
}

export function GetStartedButton({classNameButton, classNameLink}: GetStartedButtonProps) {
    return (
        <Link href={routes.getStarted} className={classNameLink}>
            <Button size="lg" className={classNameButton}>
                Get started
            </Button>
        </Link>
    );
}
