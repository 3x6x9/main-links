"use client";

import Link from "next/link";
import { SettingsIcon, UserIcon, CircleUserRound, HouseIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { routes } from "@/shared/constants";
import { LogoutForm } from "@/features/auth/components/logout-form";

type UserMenuProps = {
    username: string;
};

export function UserMenu({username}: UserMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="User menu"
                    />
                }
            >
                <UserIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem render={<Link href={routes.dashboard} />}>
                    <HouseIcon />
                    Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href={routes.user(username)} />}>
                    <CircleUserRound />
                    Profile Page
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href={routes.settings} />}>
                    <SettingsIcon />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem render={<LogoutForm />} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
