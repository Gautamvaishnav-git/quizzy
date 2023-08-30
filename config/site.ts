export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Redux & Next UI",
  description: "Learn and create your dream projects",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Quiz",
      href: "/quiz",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/Gautamvaishnav-git",
    sponsor: "https://gautamvaishnav.netlify.app/",
  },
};
