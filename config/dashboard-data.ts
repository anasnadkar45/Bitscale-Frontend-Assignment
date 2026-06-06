import type { DashboardData } from "./dashboard-types";

export const dashboardData: DashboardData = {
  welcome: {
    title: "Welcome back, Tim!",
    subtitle: "Here’s your daily scoop on Bitscale!",
  },

  actions: [
    {
      id: "find-companies",
      label: "Find Companies",
      icon: "https://api.iconify.design/lucide/building-2.svg",
      variant: "outline",
    },
    {
      id: "find-people",
      label: "Find People",
      icon: "https://api.iconify.design/lucide/users.svg",
      variant: "outline",
    },
    {
      id: "new-grid",
      label: "New Grid",
      icon: "https://api.iconify.design/lucide/plus.svg",
      variant: "dark",
    },
  ],

  latestCard: {
    badge: "Latest from Bitscale",
    title: "How to Integrate 2 Way HubSpot",
    description:
      "Prerequisites for this Integration is that you should have a HubSpot account and Copy the API key. We simple add our API key through the integrations pa...",
    thumbnail: "https://img.youtube.com/vi/Zw3fnuOQp2g/maxresdefault.jpg",
    postedAt: "Posted today",
    slidesCount: 4,
    activeSlide: 0,
  },

  productDemo: {
    title: "Complete product demo",
    subtitle: "92% of users nailed BitScale after this walkthrough",
    icon: "https://api.iconify.design/lucide/clipboard-check.svg",
    progress: 75,
    tasks: [
      {
        id: "create-data-list",
        label: "Create your data list",
        completed: true,
      },
      {
        id: "learn-bitagent",
        label: "Learn about BitAgent",
        completed: true,
      },
      {
        id: "connect-integration",
        label: "Connect an integration",
        completed: true,
      },
      {
        id: "customise-waterfall",
        label: "Customise waterfall providers",
        completed: false,
      },
    ],
  },

  tabs: [
    {
      id: "my-grids",
      label: "My Grids",
      active: true,
    },
    {
      id: "starred",
      label: "Starred",
      active: false,
    },
  ],

  search: {
    placeholder: "Search grids and workbooks...",
  },

  gridIcons: {
    workbook: {
      label: "Workbook",
      icon: "https://api.iconify.design/lucide/folder-kanban.svg",
    },
    group: {
      label: "Group",
      icon: "https://api.iconify.design/lucide/users.svg",
    },
    building: {
      label: "Company",
      icon: "https://api.iconify.design/lucide/building-2.svg",
    },
    linkedin: {
      label: "LinkedIn",
      icon: "https://api.iconify.design/simple-icons/linkedin.svg",
    },
    "sales-nav": {
      label: "Sales Navigator",
      icon: "https://api.iconify.design/lucide/navigation.svg",
    },
    company: {
      label: "Find Company",
      icon: "https://api.iconify.design/lucide/building.svg",
    },
    csv: {
      label: "CSV",
      icon: "https://api.iconify.design/lucide/file-spreadsheet.svg",
    },
    people: {
      label: "Find People",
      icon: "https://api.iconify.design/lucide/user-search.svg",
    },
    "google-maps": {
      label: "Google Maps",
      icon: "https://api.iconify.design/simple-icons/googlemaps.svg",
    },
    google: {
      label: "Google",
      icon: "https://api.iconify.design/simple-icons/google.svg",
    },
    factors: {
      label: "Factors",
      icon: "https://api.iconify.design/lucide/chart-no-axes-combined.svg",
    },
    hubspot: {
      label: "HubSpot",
      icon: "https://api.iconify.design/simple-icons/hubspot.svg",
    },
  },

  grids: [
    {
      id: "1",
      name: "Workbook - Testing design Ideas for grid and workbook",
      isStarred: false,
      isExpanded: true,
      icons: ["workbook", "group", "building"],
      editedBy: {
        avatar: "https://i.pravatar.cc/100?img=12",
        name: "Sam Taylor",
      },
      lastUpdatedAt: "06 Aug, 2025",
    },
    {
      id: "2",
      name: "LinkedIn",
      isStarred: false,
      icons: ["linkedin"],
      editedBy: {
        avatar: "https://i.pravatar.cc/100?img=32",
        name: "Chris Parker",
      },
      lastUpdatedAt: "06 Aug, 2025",
    },
    {
      id: "3",
      name: "Sales nav",
      isStarred: false,
      icons: ["sales-nav"],
      editedBy: {
        avatar: "https://i.pravatar.cc/100?img=47",
        name: "Jone Doe",
      },
      lastUpdatedAt: "06 Aug, 2025",
    },
    {
      id: "4",
      name: "find company",
      isStarred: true,
      icons: ["company"],
      editedBy: {
        avatar: "https://i.pravatar.cc/100?img=15",
        name: "Alex Morgan",
      },
      lastUpdatedAt: "06 Aug, 2025",
    },
    {
      id: "5",
      name: "import csv",
      isStarred: true,
      icons: ["csv"],
      editedBy: {
        avatar: "https://i.pravatar.cc/100?img=28",
        name: "Drew Wilson",
      },
      lastUpdatedAt: "06 Aug, 2025",
    },
    {
      id: "6",
      name: "Find people",
      isStarred: true,
      icons: ["people"],
      editedBy: {
        avatar: "https://i.pravatar.cc/100?img=47",
        name: "Jone Doe",
      },
      lastUpdatedAt: "06 Aug, 2025",
    },
    {
      id: "7",
      name: "Google maps",
      isStarred: false,
      icons: ["google-maps"],
      editedBy: {
        avatar: "https://i.pravatar.cc/100?img=47",
        name: "Jone Doe",
      },
      lastUpdatedAt: "06 Aug, 2025",
    },
    {
      id: "8",
      name: "google search results",
      isStarred: false,
      icons: ["google"],
      editedBy: {
        avatar: "https://i.pravatar.cc/100?img=47",
        name: "Jone Doe",
      },
      lastUpdatedAt: "06 Aug, 2025",
    },
    {
      id: "9",
      name: "factors",
      isStarred: false,
      icons: ["factors"],
      editedBy: {
        avatar: "https://i.pravatar.cc/100?img=47",
        name: "Jone Doe",
      },
      lastUpdatedAt: "06 Aug, 2025",
    },
    {
      id: "10",
      name: "Hubspot List - 10 (05 Aug 25)",
      isStarred: true,
      icons: ["hubspot"],
      editedBy: {
        avatar: "https://i.pravatar.cc/100?img=47",
        name: "Jone Doe",
      },
      lastUpdatedAt: "06 Aug, 2025",
    },
  ],
};