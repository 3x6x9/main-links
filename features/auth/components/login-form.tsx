"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginInput } from "@/features/auth/schemas/login";
import { loginAction } from "@/features/auth/actions/login";
import { useRouter } from "next/navigation";
import { routes } from "@/shared/constants";

export function LoginForm() {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginInput>(
        {
            resolver: zodResolver(loginSchema),
            defaultValues: {
                identifier: "",
                password: ""
            }
        }
    );

    async function onSubmit(values: LoginInput) {
        const result = await loginAction(values);

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
                <Label htmlFor="identifier">
                    Email or username
                </Label>
                <Input
                    id="identifier"
                    type="text"
                    autoComplete="username"
                    placeholder="you@example.com or username"
                    aria-invalid={!!errors.identifier}
                    {...register("identifier")}
                />
                {errors.identifier && (
                    <p className="text-sm text-destructive">
                        {errors.identifier.message}
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
                    autoComplete="current-password"
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
                {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
        </form>
    );
}
