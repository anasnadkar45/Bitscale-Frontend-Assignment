"use client";

import React, { useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type MultiSelectFilterProps = {
  label: string;
  hint: string;
  icon: React.ElementType;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
};

export default function MultiSelectFilter({
  label,
  hint,
  icon: Icon,
  options,
  value,
  onChange,
}: MultiSelectFilterProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

  function toggleOption(option: string) {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
    } else {
      onChange([...value, option]);
    }
  }

  function clearAll() {
    onChange([]);
    setSearchValue("");
  }

  return (
    <div className="border-b border-slate-200 pb-4">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-start justify-between text-left"
      >
        <div>
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-slate-500" />

            <h3 className="text-[15px] font-semibold text-slate-950">
              {label}
            </h3>

            {value.length > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-950 px-1.5 text-[11px] font-semibold text-white">
                {value.length}
              </span>
            )}
          </div>

          <p className="mt-0.5 text-sm text-slate-500">{hint}</p>
        </div>

        <ChevronDown
          className={cn(
            "mt-1 h-4 w-4 text-slate-600 transition-transform",
            expanded && "rotate-180"
          )}
        />
      </button>

      {expanded && (
        <div className="mt-3">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 text-left text-sm text-slate-900 shadow-sm"
              >
                <span className="truncate">
                  {value.length > 0 ? value[0] : `Select ${label}`}
                </span>

                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              className="z-[80] w-[340px] overflow-hidden rounded-2xl border border-slate-200 p-0 shadow-xl"
            >
              <div className="border-b border-slate-200 p-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search..."
                    className="h-10 rounded-xl border-0 bg-slate-100 pl-9 shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>

              <ScrollArea className="h-[230px]">
                <div className="py-2">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => {
                      const selected = value.includes(option);

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleOption(option)}
                          className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-slate-900 hover:bg-slate-50"
                        >
                          <span>{option}</span>
                          {selected && <Check className="h-4 w-4" />}
                        </button>
                      );
                    })
                  ) : (
                    <p className="px-4 py-6 text-center text-sm text-slate-500">
                      No option found.
                    </p>
                  )}
                </div>
              </ScrollArea>

              <div className="border-t border-slate-200 p-3">
                <button
                  type="button"
                  onClick={clearAll}
                  className="w-full text-center text-sm text-slate-500 hover:text-slate-900"
                >
                  Clear all
                </button>
              </div>
            </PopoverContent>
          </Popover>

          {value.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {value.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700"
                >
                  {item}

                  <button
                    type="button"
                    onClick={() => toggleOption(item)}
                    className="ml-1 text-indigo-500 hover:text-indigo-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}