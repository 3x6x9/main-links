import Link from "next/link";

import { AuthCard } from "@/features/auth/components/auth-card";
import { SignupForm } from "@/features/auth/components/signup-form";
import { PageContainer } from "@/shared/components";
import { routes } from "@/shared/constants";

export function SignupPage() {
    return (
        <PageContainer className="flex min-h-dvh items-center justify-center py-10">
            <AuthCard
                title="Create your account"
                description="Choose your username and start building your profile."
                footer={
                    <p>
                        Already have an account?{" "}
                        <Link href={routes.signin}>
                            Sign in
                        </Link>
                    </p>
                }
            >
                <SignupForm />
            </AuthCard>
        </PageContainer>
    );
}