import { PageContainer } from "@/shared/components";
import { GetStartedButton } from "@/features/marketing/components/get-started-button";

export function LandingPage() {
    return (
        <PageContainer className="flex flex-1 items-center py-16">
            <section className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
                <div className="space-y-5">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                        Your digital presence,
                        <br />
                        simplified.
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
                        mainLinks helps you manage your online identity
                        with a simple, powerful profile experience.
                    </p>
                </div>
                <GetStartedButton />
                <p className="mt-12 text-center text-xs text-muted-foreground">
                    mainLinks · Beta
                </p>
            </section>
        </PageContainer>
    );
}
