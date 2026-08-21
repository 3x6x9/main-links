import Link from "next/link";

import { PageContainer } from "@/shared/components";
import { AuthCard } from "@/features/auth/components/auth-card";
import { LoginForm } from "@/features/auth/components/login-form";
import { routes } from "@/shared/constants";

export function LoginPage() {
    return (
        <PageContainer className="flex min-h-dvh items-center justify-center py-10">
            <AuthCard
                title="Welcome back"
                description="Sign in to manage your mainLinks account."
                footer={
                    <p>
                        Don&#39;t have an account?{" "}
                        <Link href={routes.signup}>
                            Sign up
                        </Link>
                    </p>
                }
            >
                <LoginForm />
            </AuthCard>
        </PageContainer>
    );
}
