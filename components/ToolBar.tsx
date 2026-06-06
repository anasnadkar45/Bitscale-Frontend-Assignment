"use client";

import React, { useMemo, useState } from "react";
import {
  Building,
  Briefcase,
  Check,
  ChevronDown,
  Eye,
  Globe,
  LockKeyhole,
  MapPin,
  Plus,
  Save,
  Search,
  User,
  Users,
} from "lucide-react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

const samplePeople = [
  {
    id: 1,
    name: "Alex Morgan",
    title: "Software Engineer",
    headline: "Building scalable frontend systems",
    linkedinUrl: "linkedin.com/in/alexmorgan",
    company: "Bitscale",
    companyUrl: "bitscale.ai",
    location: "United States",
    companyLocation: "United States",
    companyHeadcount: "11-50",
    managementLevel: "Employee",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    title: "Senior Software Engineer",
    headline: "Backend and cloud systems at scale",
    linkedinUrl: "linkedin.com/in/sarahwilson",
    company: "HubSpot",
    companyUrl: "hubspot.com",
    location: "UAE",
    companyLocation: "UAE",
    companyHeadcount: "10000+",
    managementLevel: "Manager",
  },
  {
    id: 3,
    name: "Chris Parker",
    title: "Product Manager",
    headline: "Founder building AI workflow tools",
    linkedinUrl: "linkedin.com/in/chrisparker",
    company: "ScaleFlow",
    companyUrl: "scaleflow.io",
    location: "London",
    companyLocation: "United Kingdom",
    companyHeadcount: "1-10",
    managementLevel: "Founder",
  },
  {
    id: 4,
    name: "Jane Doe",
    title: "UX Designer",
    headline: "Design systems and product experience",
    linkedinUrl: "linkedin.com/in/janedoe",
    company: "Google",
    companyUrl: "google.com",
    location: "United States",
    companyLocation: "United States",
    companyHeadcount: "10000+",
    managementLevel: "Manager",
  },
  {
    id: 5,
    name: "Mohammed Ali",
    title: "Data Scientist",
    headline: "ML pipelines and analytics",
    linkedinUrl: "linkedin.com/in/mohammedali",
    company: "LinkedIn",
    companyUrl: "linkedin.com",
    location: "UAE",
    companyLocation: "UAE",
    companyHeadcount: "1000-5000",
    managementLevel: "Director",
  },
  {
    id: 6,
    name: "Emma Brown",
    title: "DevOps Engineer",
    headline: "Cloud infra and deployment automation",
    linkedinUrl: "linkedin.com/in/emmabrown",
    company: "Amazon",
    companyUrl: "amazon.com",
    location: "London",
    companyLocation: "United Kingdom",
    companyHeadcount: "10000+",
    managementLevel: "Employee",
  },
];

type FilterState = {
  peopleKeyword: string;
  jobTitle: string[];
  companyWebsite: string[];
  personLocation: string[];
  companyLocation: string[];
  companyHeadcount: string[];
  managementLevel: string[];
};

const initialFilters: FilterState = {
  peopleKeyword: "",
  jobTitle: [],
  companyWebsite: [],
  personLocation: [],
  companyLocation: [],
  companyHeadcount: [],
  managementLevel: [],
};

type MultiSelectFilterProps = {
  label: string;
  hint: string;
  icon: React.ElementType;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
};

function MultiSelectFilter({
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

const ToolBar = () => {
  const [openPeopleDialog, setOpenPeopleDialog] = useState(false);
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
    <>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-medium">Welcome back, Tim</h1>
          <p className="text-muted-foreground">
            Here's your daily scoop on Bitscale!
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Building className="text-green-700" />
            <span>Find Companies</span>
          </Button>

          <Button variant="outline" onClick={() => setOpenPeopleDialog(true)}>
            <User />
            <span>Find People</span>
          </Button>

          <Button>
            <Plus />
            <span>New Grid</span>
          </Button>
        </div>
      </div>

      <Dialog open={openPeopleDialog} onOpenChange={setOpenPeopleDialog}>
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
                      options={[
                        "Software Engineer",
                        "Senior Software Engineer",
                        "Product Manager",
                        "UX Designer",
                        "Data Scientist",
                        "DevOps Engineer",
                      ]}
                      value={filterValues.jobTitle}
                      onChange={(value) =>
                        updateMultiFilter("jobTitle", value)
                      }
                    />

                    <MultiSelectFilter
                      label="Company Website"
                      hint="E.g: Google.com, LinkedIn.com"
                      icon={Globe}
                      options={[
                        "bitscale.ai",
                        "hubspot.com",
                        "scaleflow.io",
                        "google.com",
                        "linkedin.com",
                        "amazon.com",
                      ]}
                      value={filterValues.companyWebsite}
                      onChange={(value) =>
                        updateMultiFilter("companyWebsite", value)
                      }
                    />

                    <MultiSelectFilter
                      label="Person Location"
                      hint="E.g: London, Great New York City"
                      icon={MapPin}
                      options={["United States", "UAE", "London"]}
                      value={filterValues.personLocation}
                      onChange={(value) =>
                        updateMultiFilter("personLocation", value)
                      }
                    />

                    <MultiSelectFilter
                      label="Company Location"
                      hint="E.g: United States, UAE"
                      icon={MapPin}
                      options={["United States", "UAE", "United Kingdom"]}
                      value={filterValues.companyLocation}
                      onChange={(value) =>
                        updateMultiFilter("companyLocation", value)
                      }
                    />

                    <MultiSelectFilter
                      label="Company Headcount"
                      hint="E.g: 11-50, 10000+"
                      icon={Users}
                      options={["1-10", "11-50", "1000-5000", "10000+"]}
                      value={filterValues.companyHeadcount}
                      onChange={(value) =>
                        updateMultiFilter("companyHeadcount", value)
                      }
                    />

                    <MultiSelectFilter
                      label="Management Level"
                      hint="E.g: Owner, Founder"
                      icon={Users}
                      options={["Employee", "Manager", "Director", "Founder"]}
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
                          <th className="px-4 py-3 font-semibold">
                            LOCATION
                          </th>
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
                          Start your people search, preview, and import people
                          for enrichment by applying any filter in the left
                          panel.
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
    </>
  );
};

export default ToolBar;