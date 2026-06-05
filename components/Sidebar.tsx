"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarImage,
} from "./ui/avatar";
import { sidebarConfig } from "@/config/sidebar";
import { ChevronRight, ChevronsUpDown, ChevronUp } from "lucide-react";

const Sidebar = () => {
    const activeWorkspace = sidebarConfig.workspace[0];

    return (
        <aside className="flex h-screen w-[220px] flex-col border-r border-gray-200 bg-white">
            {/* Logo */}
            <div className="flex h-[57px] items-center border-b border-gray-200 px-4">
                <Image
                    src="/Bitscale_Logo.svg"
                    alt="Bitscale Logo"
                    width={1000}
                    height={1000}
                    priority
                    className="h-auto"
                />
            </div>

            {/* Workspace Selector */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        className="flex w-full items-center justify-between border-b border-gray-200 px-4 py-3 text-left outline-none"
                    >
                        <div className="flex items-center gap-2">
                            <AvatarGroup>
                                {sidebarConfig.workspace.map((space) => (
                                    <Avatar className="size-7" key={space.name}>
                                        <AvatarImage src={space.avatar} alt={space.name} />
                                        <AvatarFallback>
                                            {space.name.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                ))}
                            </AvatarGroup>

                            <span className="text-sm font-medium text-gray-900">
                                {activeWorkspace.name}
                            </span>
                        </div>

                        <ChevronsUpDown className="size-4 text-gray-500" />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="center" className="w-[190px]
                ">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Workspace</DropdownMenuLabel>
                        <DropdownMenuItem>GTM Spaces</DropdownMenuItem>
                        <DropdownMenuItem>Create workspace</DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4">
                {sidebarConfig.sections.map((section) => (
                    <div key={section.title} className="mb-6">
                        <p className="mb-2 px-2 text-xs font-medium text-gray-400">
                            {section.title}
                        </p>

                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const Icon = item.icon;
                                const BadgeIcon = item.badgeIcon;

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`flex h-9 items-center justify-between rounded-lg px-2 text-sm transition ${item.active
                                                ? "bg-muted text-blue-600"
                                                : item.disabled
                                                    ? "text-muted-foreground"
                                                    : "text-foreground/80 hover:bg-muted"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Icon className="size-4" />
                                            <span>{item.label}</span>
                                        </div>

                                        {item.active && <ChevronRight className="size-4" />}

                                        {BadgeIcon && (
                                            <div className="flex h-6 w-10 items-center justify-center rounded-full bg-yellow-50 text-yellow-600">
                                                <BadgeIcon className="size-3.5" />
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Support Box */}
            <div className="p-2">
                <div className="flex items-center justify-between rounded-sm bg-secondary px-3 py-3">
                    <div>
                        <Image
                            src="/Bitscale_Logo.svg"
                            alt="Bitscale Logo"
                            width={120}
                            height={400}
                            priority
                            className="h-auto"
                        />
                        <p className="text-xs text-muted-foreground">
                            {sidebarConfig.support.subtitle}
                        </p>
                    </div>

                    <ChevronUp className="size-4 text-muted-foreground" />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;