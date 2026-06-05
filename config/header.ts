interface Header {
  icon: string;
  availableTokens: number;
  totalTokens: number;
  label: string;
  avatar: string;
  user: {
    name: string;
    email: string;
  };
  menuItems: {
    label: string;
  }[];
}

export const header: Header = {
  icon: "/Coin.png",
  availableTokens: 450000,
  totalTokens: 5500000,
  label: "Booster Plan",
  avatar: "/HeaderImage.png",
  user: {
    name: "Anas Nadkar",
    email: "anasnadkar23@gmail.com",
  },
  menuItems: [
    {
      label: "Profile",
    },
    {
      label: "Settings",
    },
    {
      label: "Billing",
    },
    {
      label: "Logout",
    },
  ],
};