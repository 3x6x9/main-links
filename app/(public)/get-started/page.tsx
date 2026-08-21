import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/auth/server";
import { routes } from "@/shared/constants";

export default async function GetStartedPage() {

    const session = await getCurrentSession();

    if (session) {
        redirect(routes.dashboard);
    }

    redirect(routes.signup);
}
