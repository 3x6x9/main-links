import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

type AuthCardProps = {
    title: string;
    description: string;
    children: ReactNode;
    footer?: ReactNode;
};

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {
                footer && (
                    <CardFooter className="justify-center text-sm text-muted-foreground">
                        {footer}
                    </CardFooter>
                )
            }
        </Card>
    );
}
