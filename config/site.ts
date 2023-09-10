export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Quizzy",
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
  links: {
    github: "https://github.com/Gautamvaishnav-git",
    sponsor: "https://gautamvaishnav.netlify.app/",
  },
};
