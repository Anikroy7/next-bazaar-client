export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "About",
      href: "/about",
    },
    {
      label: "My Orders",
      href: '/order-history'
    }
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "About",
      href: "/about",
    },
    {
      label: "My Orders",
      href: '/order-history'
    }
  ],

};
