export const dashboardMenuData = [
    {
        title: "Home",
        link: "/dashboard",
        icon: "ri-home-4-fill"
    },
    {
        title: "Management",
        icon: "ri-admin-fill",
        sublinks: [
            { title: "Users", link: "/dashboard/userManage" },
            { title: "Projects", link: "/management/projects" },
            { title: "Timeline", link: "/management/timeline" }
        ]
    },
    {
        title: "Learning",
        icon: "ri-git-repository-fill",
        sublinks: [
            { title: "Software", link: "/management/software" },
            { title: "Hardware", link: "/management/hardware" },
        ]
    },
    {
        title: "Projects",
        icon: "ri-file-fill",
        sublinks: [
            { title: "Project 1", link: "#" },
            { title: "Project 2", link: "#" },
            { title: "Project 3", link: "#" },
        ]
    },
];

// New apps and pages section data
export const appsAndPagesData = [
    {
        title: "Home Site",
        link: "/home-site",
        icon: "ri-home-fill"
    },
    {
        title: "Email",
        link: "/email",
        icon: "ri-mail-fill"
    },
    {
        title: "Calendar",
        link: "/calendar",
        icon: "ri-calendar-fill"
    },
    {
        title: "Music",
        icon: "ri-music-2-fill",
        sublinks: [
            { title: "Playlists", link: "/music/playlists" },
            { title: "Favorite Songs", link: "/music/favorites" }
        ]
    },
    {
        title: "Websites",
        icon: "ri-global-fill",
        sublinks: [
            { title: "Learning", link: "/websites/learning" },
            { title: "Useful", link: "/websites/useful" }
        ]
    }
];

// New configuration section data
export const configsData = [
    {
        title: "Users",
        link: "/configs/users",
        icon: "ri-user-settings-fill"
    },
    {
        title: "Posts",
        link: "/configs/posts",
        icon: "ri-file-list-3-fill"
    },
    {
        title: "Dashboard",
        link: "/configs/dashboard",
        icon: "ri-dashboard-3-fill"
    }
];