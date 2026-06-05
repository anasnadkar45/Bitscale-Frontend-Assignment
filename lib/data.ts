export interface myGird {
  id: string;
  userData: {
    name: string;
    isStared: boolean;
    icons: string[];
  };
  editedBy: {
    avatar: string;
    name: string;
  };
  lastUpdatedAt: string;
}

export const myGridData: myGird[] = [
  {
    id: "1",
    userData: {
      name: "Workbook - Testing design Ideas for grid and workbook",
      isStared: false,
      icons: ["workbook", "group", "building"],
    },
    editedBy: {
      avatar: "/avatars/sam-taylor.jpg",
      name: "Sam Taylor",
    },
    lastUpdatedAt: "06 Aug, 2025",
  },
  {
    id: "2",
    userData: {
      name: "LinkedIn",
      isStared: false,
      icons: ["linkedin"],
    },
    editedBy: {
      avatar: "/avatars/chris-parker.jpg",
      name: "Chris Parker",
    },
    lastUpdatedAt: "06 Aug, 2025",
  },
  {
    id: "3",
    userData: {
      name: "Sales nav",
      isStared: false,
      icons: ["sales-nav"],
    },
    editedBy: {
      avatar: "/avatars/jone-doe.jpg",
      name: "Jone Doe",
    },
    lastUpdatedAt: "06 Aug, 2025",
  },
  {
    id: "4",
    userData: {
      name: "find company",
      isStared: true,
      icons: ["company"],
    },
    editedBy: {
      avatar: "/avatars/alex-morgan.jpg",
      name: "Alex Morgan",
    },
    lastUpdatedAt: "06 Aug, 2025",
  },
  {
    id: "5",
    userData: {
      name: "import csv",
      isStared: true,
      icons: ["csv"],
    },
    editedBy: {
      avatar: "/avatars/drew-wilson.jpg",
      name: "Drew Wilson",
    },
    lastUpdatedAt: "06 Aug, 2025",
  },
  {
    id: "6",
    userData: {
      name: "Find people",
      isStared: true,
      icons: ["people"],
    },
    editedBy: {
      avatar: "/avatars/jone-doe.jpg",
      name: "Jone Doe",
    },
    lastUpdatedAt: "06 Aug, 2025",
  },
  {
    id: "7",
    userData: {
      name: "Google maps",
      isStared: false,
      icons: ["google-maps"],
    },
    editedBy: {
      avatar: "/avatars/jone-doe.jpg",
      name: "Jone Doe",
    },
    lastUpdatedAt: "06 Aug, 2025",
  },
  {
    id: "8",
    userData: {
      name: "google search results",
      isStared: false,
      icons: ["google"],
    },
    editedBy: {
      avatar: "/avatars/jone-doe.jpg",
      name: "Jone Doe",
    },
    lastUpdatedAt: "06 Aug, 2025",
  },
  {
    id: "9",
    userData: {
      name: "factors",
      isStared: false,
      icons: ["factors"],
    },
    editedBy: {
      avatar: "/avatars/jone-doe.jpg",
      name: "Jone Doe",
    },
    lastUpdatedAt: "06 Aug, 2025",
  },
  {
    id: "10",
    userData: {
      name: "Hubspot List - 10 (05 Aug 25)",
      isStared: true,
      icons: ["hubspot"],
    },
    editedBy: {
      avatar: "/avatars/jone-doe.jpg",
      name: "Jone Doe",
    },
    lastUpdatedAt: "06 Aug, 2025",
  },
];