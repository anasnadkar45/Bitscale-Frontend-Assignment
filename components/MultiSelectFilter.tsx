"use client";

import React, { useMemo, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

type MultiSelectFilterProps = {
  label: string;
  hint?: string;
  icon: React.ElementType;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
};

const MultiSelectFilter = ({
  label,
  hint,
  icon: Icon,
  options,
  value,
  onChange,
}: MultiSelectFilterProps) => {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const selectedSet = useMemo(() => new Set(value), [value]);

  function toggleOption(option: string) {
    if (selectedSet.has(option)) {
      onChange(value.filter((item) => item !== option));
    } else {
      onChange([...value, option]);
    }
  }

  function clearAll() {
    onChange([]);
  }

  return (
    <div className="border-b border-slate-200 pb-4">
      <button
        type="button"
        onClick={() => setCollapsed((prev) => !prev)}
        className="flex w-full items-start justify-between text-left"
      >
        <div>
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-slate-600" />
            <h3 className="text-[15px] font-semibold text-slate-900">
              {label}
            </h3>

            {value.length > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1.5 text-[11px] font-medium text-white">
                {value.length}
              </span>
            )}
          </div>

          {hint && (
            <p className="mt-0.5 text-sm text-slate-500">{hint}</p>
          )}
        </div>

        <ChevronDown
          className={cn(
            "mt-1 h-4 w-4 text-slate-600 transition-transform",
            collapsed && "-rotate-180"
          )}
        />
      </button>

      {!collapsed && (
        <div className="mt-3 space-y-3">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="h-10 w-full justify-between rounded-xl border-slate-200 bg-white font-normal text-slate-900"
              >
                <span className="truncate">
                  {value.length > 0 ? value[0] : `Select ${label.toLowerCase()}`}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              className="w-[300px] rounded-2xl p-0"
            >
              <Command>
                <div className="border-b border-slate-200 p-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <CommandInput
                      placeholder="Search..."
                      className="h-9 rounded-lg border-0 bg-slate-100 pl-9"
                    />
                  </div>
                </div>

                <CommandList className="max-h-[220px]">
                  <CommandEmpty>No option found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => {
                      const isSelected = selectedSet.has(option);

                      return (
                        <CommandItem
                          key={option}
                          onSelect={() => toggleOption(option)}
                          className="flex cursor-pointer items-center justify-between px-4 py-3"
                        >
                          <span>{option}</span>
                          {isSelected && (
                            <Check className="h-4 w-4 text-slate-900" />
                          )}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>

                <div className="border-t border-slate-200 p-3">
                  <button
                    type="button"
                    onClick={clearAll}
                    className="w-full text-center text-sm text-slate-500 hover:text-slate-900"
                  >
                    Clear all
                  </button>
                </div>
              </Command>
            </PopoverContent>
          </Popover>

          {value.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {value.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => toggleOption(item)}
                    className="ml-1 text-indigo-500 hover:text-indigo-700"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectFilter;