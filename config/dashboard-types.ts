export type GridIconType =
  | "workbook"
  | "group"
  | "building"
  | "linkedin"
  | "sales-nav"
  | "company"
  | "csv"
  | "people"
  | "google-maps"
  | "google"
  | "factors"
  | "hubspot";

export interface DashboardAction {
  id: string;
  label: string;
  icon: string;
  variant: "outline" | "dark";
}

export interface LatestCard {
  badge: string;
  title: string;
  description: string;
  thumbnail: string;
  postedAt: string;
  slidesCount: number;
  activeSlide: number;
}

export interface DemoTask {
  id: string;
  label: string;
  completed: boolean;
}

export interface ProductDemo {
  title: string;
  subtitle: string;
  icon: string;
  progress: number;
  tasks: DemoTask[];
}

export interface GridIconConfig {
  label: string;
  icon: string;
}

export interface MyGrid {
  id: string;
  name: string;
  isStarred: boolean;
  isExpanded?: boolean;
  icons: GridIconType[];
  editedBy: {
    avatar: string;
    name: string;
  };
  lastUpdatedAt: string;
}

export interface DashboardTab {
  id: "my-grids" | "starred";
  label: string;
  active: boolean;
}

export interface DashboardData {
  welcome: {
    title: string;
    subtitle: string;
  };
  actions: DashboardAction[];
  latestCard: LatestCard;
  productDemo: ProductDemo;
  tabs: DashboardTab[];
  search: {
    placeholder: string;
  };
  gridIcons: Record<GridIconType, GridIconConfig>;
  grids: MyGrid[];
}