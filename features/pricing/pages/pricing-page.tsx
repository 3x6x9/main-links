import { Check } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GetStartedButton } from "@/features/marketing/components/get-started-button";
import { MAX_LINKS_PER_USER } from "@/shared/constants";

const freeFeatures = [
    `Up to ${MAX_LINKS_PER_USER} links`,
    "Create and manage your links",
    "Share your public links",
    "No credit card required",
    "Free to use"
];

export function PricingPage() {
    return (
        <main className="container mx-auto px-4 py-12 sm:py-16">
            <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-medium text-muted-foreground">
                    Pricing
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                    Simple pricing. Free for now.
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                    Everything you need to create and manage your links, without a
                    subscription or credit card.
                </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
                <Card className="shadow-sm">
                    <CardHeader className="px-6">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <CardTitle className="text-xl">Free</CardTitle>
                                <CardDescription className="mt-1">
                                    Everything available today.
                                </CardDescription>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold">$0</div>
                                <div className="text-sm text-muted-foreground">forever</div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="px-6">
                        <div className="mb-6 h-px bg-border" />
                        <ul className="space-y-3">
                            {
                                freeFeatures.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <Check className="size-4 shrink-0 text-primary" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </CardContent>
                    <CardFooter className="px-6">
                        <GetStartedButton classNameButton="w-full" classNameLink="w-full" />
                    </CardFooter>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader className="px-6">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <CardTitle className="text-xl">Paid plans</CardTitle>
                                <CardDescription className="mt-1">
                                    More options are coming.
                                </CardDescription>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold">TBC</div>
                                <div className="text-sm text-muted-foreground">
                                    coming soon
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="px-6">
                        <div className="mb-6 h-px bg-border" />
                        <div className="rounded-lg bg-muted/50 px-4 py-6 text-center">
                            <p className="font-medium">Not available yet</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Paid plans are currently being planned. You can use everything
                                available today on our free plan.
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="px-6 w-full h-full text-center justify-center text-sm text-muted-foreground">
                        Stay tuned for more options.
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
}
