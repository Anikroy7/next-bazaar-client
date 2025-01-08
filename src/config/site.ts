export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next Bazaar",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Compare",
      href: "/product-compare",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "Recent products",
      href: "/recent-products",
    },
    {
      label: "Compare",
      href: "/product-compare",
    },

    {
      label: "About",
      href: "/about",
    },

    {
      label: "Contact",
      href: "/contact",
    },
  ],
};
