import {
    LayoutDashboard,
    BookOpen,
    Link2,
    FileText,
    Settings,
    Rocket,
} from "lucide-react";

export const sidebarConfig = {
    logo: {
        name: "Bitscale",
    },

    workspace: [
        {
            name: "GTM Spaces",
            avatar: "/SidebarImage1.png",
        },
        {
            name: "ANAS Spaces",
            avatar: "/SidebarImage2.png",
        },
    ],

    sections: [
        {
            title: "Home",
            items: [
                {
                    label: "My Dashboard",
                    href: "/dashboard",
                    icon: LayoutDashboard,
                    active: true,
                },
                {
                    label: "Playbooks",
                    href: "/playbooks",
                    icon: BookOpen,
                    disabled: true,
                    badgeIcon: Rocket,
                },
                {
                    label: "Integrations",
                    href: "/integrations",
                    icon: Link2,
                },
            ],
        },
        {
            title: "Other",
            items: [
                {
                    label: "Documentation",
                    href: "/documentation",
                    icon: FileText,
                },
                {
                    label: "Settings",
                    href: "/settings",
                    icon: Settings,
                },
            ],
        },
    ],

    support: {
        title: "Bitscale",
        subtitle: "Get Support at Bitscale",
    },
};