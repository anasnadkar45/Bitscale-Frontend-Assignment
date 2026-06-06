export type Person = {
  id: number;
  name: string;
  title: string;
  headline: string;
  linkedinUrl: string;
  company: string;
  companyUrl: string;
  location: string;
  companyLocation: string;
  companyHeadcount: string;
  managementLevel: string;
};

export type FilterState = {
  peopleKeyword: string;
  jobTitle: string[];
  companyWebsite: string[];
  personLocation: string[];
  companyLocation: string[];
  companyHeadcount: string[];
  managementLevel: string[];
};

export const initialFilters: FilterState = {
  peopleKeyword: "",
  jobTitle: [],
  companyWebsite: [],
  personLocation: [],
  companyLocation: [],
  companyHeadcount: [],
  managementLevel: [],
};