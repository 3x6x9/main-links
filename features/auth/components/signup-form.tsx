"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpSchema, type SignUpInput } from "@/features/auth/schemas/sign-up";
import { signUpAction } from "@/features/auth/actions/sign-up";
import { routes } from "@/shared/constants";

export function SignupForm() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpInput>(
        {
            resolver: zodResolver(signUpSchema),
            defaultValues: {
                username: "",
                email: "",
                password: ""
            }
        }
    );

    async function onSubmit(values: SignUpInput) {
        const result = await signUpAction(values);

        if (!result.success) {
            toast.error(result.error);
            return;
        }

        router.replace(routes.dashboard);
        router.refresh();
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <div className="space-y-2">
                <Label htmlFor="username">
                    Username
                </Label>
                <Input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder="your_username"
                    aria-invalid={!!errors.username}
                    {...register("username")}
                />
                {errors.username && (
                    <p className="text-sm text-destructive">
                        {errors.username.message}
                    </p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">
                    Email
                </Label>
                <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                />
                {errors.email && (
                    <p className="text-sm text-destructive">
                        {errors.email.message}
                    </p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">
                    Password
                </Label>
                <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••••••"
                    aria-invalid={!!errors.password}
                    {...register("password")}
                />
                {errors.password && (
                    <p className="text-sm text-destructive">
                        {errors.password.message}
                    </p>
                )}
            </div>
            <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
        </form>
    );
}
