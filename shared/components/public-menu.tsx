"use client";

import Link from "next/link";
import { GemIcon, LogInIcon, Menu } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { routes } from "@/shared/constants";
import { Button } from "@/components/ui/button";

export function PublicMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Open menu"
                    />
                }
            >
                <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem render={<Link href={routes.signin} />}>
                    <LogInIcon />
                    Sign In
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href={routes.pricing} />}>
                    <GemIcon />
                    Pricing
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
