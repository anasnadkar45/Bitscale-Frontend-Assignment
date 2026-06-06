"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  Building2,
  ChevronDown,
  Ellipsis,
  FileText,
  FolderKanban,
  Globe,
  Globe2,
  ListFilter,
  MapPin,
  Search,
  Star,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { dashboardData } from "@/config/dashboard-data";
import { GridIconType, MyGrid } from "@/config/dashboard-types";

function GridItemIcon({ type }: { type: GridIconType }) {
  const commonClass = "h-3.5 w-3.5";

  const iconMap: Record<GridIconType, React.ReactNode> = {
    workbook: <FolderKanban className={commonClass} />,
    group: <Users className={commonClass} />,
    building: <Building2 className={commonClass} />,
    linkedin: <Globe className={commonClass} />,
    "sales-nav": <Globe2 className={commonClass} />,
    company: <Building2 className={commonClass} />,
    csv: <FileText className={commonClass} />,
    people: <Users className={commonClass} />,
    "google-maps": <MapPin className={commonClass} />,
    google: <span className="text-[11px] font-bold text-blue-500">G</span>,
    factors: <span className="text-[11px] font-bold text-red-500">F</span>,
    hubspot: <span className="text-[11px] font-bold text-orange-500">H</span>,
  };

  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm">
      {iconMap[type]}
    </div>
  );
}

export default function GridTable() {
  const defaultActiveTab =
    dashboardData.tabs.find((tab) => tab.active)?.id ?? "my-grids";

  const [activeTab, setActiveTab] = useState<"my-grids" | "starred">(
    defaultActiveTab
  );

  const [rows, setRows] = useState<MyGrid[]>(dashboardData.grids);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const filteredRows = useMemo(() => {
    let data = [...rows];

    if (activeTab === "starred") {
      data = data.filter((row) => row.isStarred);
    }

    if (search.trim()) {
      data = data.filter((row) =>
        row.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    data.sort((a, b) => {
      if (sortAsc) {
        return a.name.localeCompare(b.name);
      }

      return b.name.localeCompare(a.name);
    });

    return data;
  }, [rows, activeTab, search, sortAsc]);

  function toggleStar(id: string) {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              isStarred: !row.isStarred,
            }
          : row
      )
    );
  }

  return (
    <div className="rounded-xl bg-white">
      <div className="flex items-center justify-between border-b border-slate-200">
        <div className="flex">
          {dashboardData.tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-5 py-4 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-slate-500 hover:text-slate-900"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-[280px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={dashboardData.search.placeholder}
              className="h-9 w-full rounded-lg border-none bg-slate-100 pl-10 pr-3 text-sm outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
          >
            <ListFilter className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs font-medium text-slate-700">
              <th className="w-[56%] px-5 py-3">
                <button
                  type="button"
                  onClick={() => setSortAsc((prev) => !prev)}
                  className="flex items-center gap-2"
                >
                  Name
                  <span
                    className={cn(
                      "transition-transform",
                      !sortAsc && "rotate-180"
                    )}
                  >
                    ↑
                  </span>
                </button>
              </th>

              <th className="w-[18%] px-5 py-3">Edited by</th>
              <th className="w-[16%] px-5 py-3">Last edited</th>
              <th className="w-[10%] px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredRows.map((row, index) => (
              <tr
                key={row.id}
                className={cn(
                  "border-b border-slate-100 text-sm transition-colors hover:bg-slate-50",
                  index < 3 && "bg-slate-50/70"
                )}
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    {row.isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-slate-700" />
                    ) : (
                      <div className="h-4 w-4" />
                    )}

                    <button type="button" onClick={() => toggleStar(row.id)}>
                      <Star
                        className={cn(
                          "h-4 w-4",
                          row.isStarred
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-400"
                        )}
                      />
                    </button>

                    <div className="flex -space-x-2">
                      {row.icons.map((icon, iconIndex) => (
                        <GridItemIcon
                          key={`${row.id}-${iconIndex}`}
                          type={icon}
                        />
                      ))}
                    </div>

                    <span className="line-clamp-1 text-slate-800">
                      {row.name}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={row.editedBy.avatar}
                      alt={row.editedBy.name}
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-full object-cover"
                    />

                    <span className="whitespace-nowrap text-slate-700">
                      {row.editedBy.name}
                    </span>
                  </div>
                </td>

                <td className="whitespace-nowrap px-5 py-3 text-slate-700">
                  {row.lastUpdatedAt}
                </td>

                <td className="px-5 py-3 text-right">
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-700 hover:bg-slate-100"
                  >
                    <Ellipsis className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}

            {filteredRows.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-10 text-center text-sm text-slate-500"
                >
                  No grids found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}