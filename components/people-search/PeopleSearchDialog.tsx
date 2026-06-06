"use client";

import { useMemo, useState } from "react";
import {
  Briefcase,
  ChevronDown,
  Eye,
  Globe,
  LockKeyhole,
  MapPin,
  Save,
  Search,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import MultiSelectFilter from "./MultiSelectFilter";
import { filterOptions, samplePeople } from "../../config/people-data";
import { FilterState, initialFilters } from "../../config/people-types";

type PeopleSearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function PeopleSearchDialog({
  open,
  onOpenChange,
}: PeopleSearchDialogProps) {
  const [filterValues, setFilterValues] = useState<FilterState>(initialFilters);
  const [showResults, setShowResults] = useState(false);
  const [savedSearch, setSavedSearch] = useState(false);

  const hasActiveFilters =
    filterValues.peopleKeyword.trim() !== "" ||
    filterValues.jobTitle.length > 0 ||
    filterValues.companyWebsite.length > 0 ||
    filterValues.personLocation.length > 0 ||
    filterValues.companyLocation.length > 0 ||
    filterValues.companyHeadcount.length > 0 ||
    filterValues.managementLevel.length > 0;

  const filteredPeople = useMemo(() => {
    if (!showResults) return [];

    const keyword = filterValues.peopleKeyword.toLowerCase();

    return samplePeople.filter((person) => {
      const matchesKeyword =
        !keyword ||
        person.name.toLowerCase().includes(keyword) ||
        person.title.toLowerCase().includes(keyword) ||
        person.headline.toLowerCase().includes(keyword) ||
        person.company.toLowerCase().includes(keyword);

      const matchesJobTitle =
        filterValues.jobTitle.length === 0 ||
        filterValues.jobTitle.includes(person.title);

      const matchesCompanyWebsite =
        filterValues.companyWebsite.length === 0 ||
        filterValues.companyWebsite.includes(person.companyUrl);

      const matchesPersonLocation =
        filterValues.personLocation.length === 0 ||
        filterValues.personLocation.includes(person.location);

      const matchesCompanyLocation =
        filterValues.companyLocation.length === 0 ||
        filterValues.companyLocation.includes(person.companyLocation);

      const matchesCompanyHeadcount =
        filterValues.companyHeadcount.length === 0 ||
        filterValues.companyHeadcount.includes(person.companyHeadcount);

      const matchesManagementLevel =
        filterValues.managementLevel.length === 0 ||
        filterValues.managementLevel.includes(person.managementLevel);

      return (
        matchesKeyword &&
        matchesJobTitle &&
        matchesCompanyWebsite &&
        matchesPersonLocation &&
        matchesCompanyLocation &&
        matchesCompanyHeadcount &&
        matchesManagementLevel
      );
    });
  }, [filterValues, showResults]);

  function updateKeyword(value: string) {
    setFilterValues((prev) => ({
      ...prev,
      peopleKeyword: value,
    }));

    setShowResults(false);
  }

  function updateMultiFilter(
    key: Exclude<keyof FilterState, "peopleKeyword">,
    value: string[]
  ) {
    setFilterValues((prev) => ({
      ...prev,
      [key]: value,
    }));

    setShowResults(false);
  }

  function handlePreviewResult() {
    setShowResults(true);
  }

  function handleSaveSearch() {
    if (!hasActiveFilters) return;
    setSavedSearch(true);
  }

  function handleReset() {
    setFilterValues(initialFilters);
    setShowResults(false);
    setSavedSearch(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[95vh] min-w-[1200px] overflow-hidden p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Find People</DialogTitle>
        </DialogHeader>

        <div className="grid h-[720px] grid-cols-[330px_1fr] overflow-hidden rounded-xl bg-white">
          <aside className="border-r border-slate-200">
            <ScrollArea className="h-[720px]">
              <div className="p-6">
                <div className="mb-7 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Find People
                  </h2>

                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-8 gap-1 rounded-lg text-xs"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                    {savedSearch ? "Saved" : "Saved Search"}
                  </Button>
                </div>

                <div className="space-y-5">
                  <div className="border-b border-slate-200 pb-4">
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-800">
                      <Users className="h-4 w-4" />
                      People Keyword
                    </label>

                    <div className="relative">
                      <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <Input
                        value={filterValues.peopleKeyword}
                        onChange={(e) => updateKeyword(e.target.value)}
                        placeholder="Enter single keyword here..."
                        className="border-0 border-b border-slate-200 px-6 shadow-none focus-visible:ring-0"
                      />
                    </div>
                  </div>

                  <MultiSelectFilter
                    label="Job Title"
                    hint="E.g: Manager, Software Engineer"
                    icon={Briefcase}
                    options={filterOptions.jobTitle}
                    value={filterValues.jobTitle}
                    onChange={(value) => updateMultiFilter("jobTitle", value)}
                  />

                  <MultiSelectFilter
                    label="Company Website"
                    hint="E.g: Google.com, LinkedIn.com"
                    icon={Globe}
                    options={filterOptions.companyWebsite}
                    value={filterValues.companyWebsite}
                    onChange={(value) =>
                      updateMultiFilter("companyWebsite", value)
                    }
                  />

                  <MultiSelectFilter
                    label="Person Location"
                    hint="E.g: London, Great New York City"
                    icon={MapPin}
                    options={filterOptions.personLocation}
                    value={filterValues.personLocation}
                    onChange={(value) =>
                      updateMultiFilter("personLocation", value)
                    }
                  />

                  <MultiSelectFilter
                    label="Company Location"
                    hint="E.g: United States, UAE"
                    icon={MapPin}
                    options={filterOptions.companyLocation}
                    value={filterValues.companyLocation}
                    onChange={(value) =>
                      updateMultiFilter("companyLocation", value)
                    }
                  />

                  <MultiSelectFilter
                    label="Company Headcount"
                    hint="E.g: 11-50, 10000+"
                    icon={Users}
                    options={filterOptions.companyHeadcount}
                    value={filterValues.companyHeadcount}
                    onChange={(value) =>
                      updateMultiFilter("companyHeadcount", value)
                    }
                  />

                  <MultiSelectFilter
                    label="Management Level"
                    hint="E.g: Owner, Founder"
                    icon={Users}
                    options={filterOptions.managementLevel}
                    value={filterValues.managementLevel}
                    onChange={(value) =>
                      updateMultiFilter("managementLevel", value)
                    }
                  />
                </div>

                <div className="sticky bottom-0 mt-4 flex gap-3 bg-white pt-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleSaveSearch}
                    disabled={!hasActiveFilters}
                    className="gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {savedSearch ? "Saved" : "Save Search"}
                  </Button>

                  <Button
                    size="sm"
                    onClick={handlePreviewResult}
                    className="flex-1 gap-2 bg-slate-900 hover:bg-slate-800"
                  >
                    <Eye className="h-4 w-4" />
                    Preview Result
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </aside>

          <section className="flex flex-col overflow-hidden p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-700">
                Found{" "}
                <span className="font-semibold">
                  {showResults ? filteredPeople.length : 0}
                </span>{" "}
                people. Click preview to view results
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                  <Search className="h-3.5 w-3.5" />
                  8000/50000
                </div>

                <p className="flex items-center gap-1 text-xs font-medium text-orange-600">
                  <LockKeyhole className="h-3.5 w-3.5" />
                  Unlock 100,000 leads with Enterprise Plan*
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-hidden rounded-lg border border-slate-200">
              <ScrollArea className="h-full w-full">
                <div className="min-w-[900px]">
                  <table className="w-full text-left text-xs">
                    <thead className="sticky top-0 z-10 bg-slate-50 text-slate-500">
                      <tr>
                        <th className="px-4 py-3 font-semibold">NAME</th>
                        <th className="px-4 py-3 font-semibold">TITLE</th>
                        <th className="px-4 py-3 font-semibold">HEADLINE</th>
                        <th className="px-4 py-3 font-semibold">
                          LINKEDIN URL
                        </th>
                        <th className="px-4 py-3 font-semibold">COMPANY</th>
                        <th className="px-4 py-3 font-semibold">
                          COMPANY URL
                        </th>
                        <th className="px-4 py-3 font-semibold">LOCATION</th>
                      </tr>
                    </thead>

                    <tbody>
                      {showResults &&
                        filteredPeople.map((person) => (
                          <tr
                            key={person.id}
                            className="border-t border-slate-100 text-slate-700"
                          >
                            <td className="whitespace-nowrap px-4 py-3 font-medium">
                              {person.name}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3">
                              {person.title}
                            </td>
                            <td className="min-w-[220px] px-4 py-3">
                              {person.headline}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 text-blue-600">
                              {person.linkedinUrl}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3">
                              {person.company}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 text-blue-600">
                              {person.companyUrl}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3">
                              {person.location}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

                  {!showResults && (
                    <div className="flex h-full min-h-[560px] flex-col items-center justify-center px-6 text-center">
                      <div className="mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-sky-50">
                        <Users className="h-12 w-12 text-sky-500" />
                      </div>

                      <p className="max-w-md text-sm text-slate-400">
                        Start your people search, preview, and import people for
                        enrichment by applying any filter in the left panel.
                      </p>

                      <p className="my-2 text-xs font-medium text-slate-400">
                        OR
                      </p>

                      <p className="text-sm text-slate-400">
                        Import people from saved search.
                      </p>
                    </div>
                  )}

                  {showResults && filteredPeople.length === 0 && (
                    <div className="flex h-full min-h-[560px] flex-col items-center justify-center px-6 text-center">
                      <p className="text-sm font-medium text-slate-600">
                        No people found.
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Try changing your filters and preview again.
                      </p>
                    </div>
                  )}
                </div>

                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Reset filters
              </Button>

              <Button
                size="sm"
                disabled={!showResults || filteredPeople.length === 0}
                className={cn(
                  "bg-slate-900 hover:bg-slate-800",
                  (!showResults || filteredPeople.length === 0) &&
                    "cursor-not-allowed opacity-50"
                )}
              >
                Import {filteredPeople.length} people
              </Button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}