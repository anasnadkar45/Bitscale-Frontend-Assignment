"use client";

import { header } from "@/config/header";
import React from "react";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const headerData = header;

  return (
    <div className="flex h-[57px] w-full items-center justify-end gap-2 border-b px-4">
      <div className="flex items-center gap-2 rounded-md bg-[#EDF3EC] p-1.5 px-2 text-[#438361]">
        <Image src={headerData.icon} alt="coin" width={30} height={30} />

        <span className="text-sm">
          {headerData.availableTokens}/{headerData.totalTokens}
        </span>

        <Badge className="rounded-sm bg-[#438361]">
          {headerData.label}
        </Badge>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full outline-none">
            <Avatar className="cursor-pointer">
              <AvatarImage src={headerData.avatar} />
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="font-medium">{headerData.user.name}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {headerData.user.email}
              </span>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {headerData.menuItems.map((item) => (
            <DropdownMenuItem key={item.label} className="cursor-pointer">
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;