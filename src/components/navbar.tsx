"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FiRefreshCcw } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTruck,
  FaTwitter,
} from "react-icons/fa";

import { useUser } from "../context/user.prodvier";

import NavbarDropdown from "./ui/NavbarDropdown";
import ShopDropDown from "./ui/homepage/dropdown/ShopDropDown";
import CategoriesDropDown from "./ui/homepage/dropdown/CategoriesDropDown";
import Cart from "./ui/cart/Cart";
import PagesDropDown from "./ui/homepage/dropdown/PagesDropDown";
import GetProductBYSearch from "./ui/shared/GetProductBYSearch";

import { ThemeSwitch } from "@/src/components/theme-switch";
import { siteConfig } from "@/src/config/site";

const DynamicLoading = dynamic(() => import("./ui/shared/Loading"), {
  ssr: false,
});

export const Navbar = () => {
  const router = useRouter();
  const { user, isLoading, setIsLoading } = useUser();
  const pathname = usePathname();

  if (isLoading) return <DynamicLoading />;

  return (
    <>
      <div className="border-b py-1 text-sm text-gray-600 flex justify-between items-center px-4 md:px-7 z-50 w-full hidden sm:flex bg-white">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-gray-700">
            <FaTruck className="h-4 w-4 text-blue-500" />
            <span>Free Delivery</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <FiRefreshCcw className="h-4 w-4 text-blue-500" />
            <span>Returns Policy</span>
          </div>
          <div className="flex items-center gap-4 text-gray-700">
            <span>Follow Us</span>
            <div className="flex items-center gap-4">
              {/* Social Media Icons */}
              <a
                aria-label="Facebook"
                className="text-gray-600 hover:text-blue-600"
                href="https://www.facebook.com/anik.roy.56100"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a
                aria-label="Twitter"
                className="text-gray-600 hover:text-blue-400"
                href="www.twitter.com"
              >
                <FaTwitter className="h-4 w-4" />
              </a>
              <a
                aria-label="Instagram"
                className="text-gray-600 hover:text-pink-500"
                href="www.instagram.com"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                aria-label="LinkedIn"
                className="text-gray-600 hover:text-blue-700"
                href="https://www.linkedin.com/in/anik-roy-a14185241"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center gap">
          {!user && (
            <>
              <Button
                isExternal
                as={Link}
                className="text-sm font-normal text-gray-900 bg-gray-100 bg-transparent"
                size="sm"
                variant="light"
                onClick={() => router.push("/signup")}
              >
                Signup
              </Button>
              <Button
                isExternal
                as={Link}
                className="text-sm font-normal text-gray-900 bg-gray-100 bg-transparent"
                size="sm"
                variant="light"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            </>
          )}
          <ThemeSwitch />
        </div>
      </div>
      <NextUINavbar maxWidth="full">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              alt={"NEXT BAZAR"}
              height={50}
              src={
                "https://pbs.twimg.com/profile_images/1565710214019444737/if82cpbS_400x400.jpg"
              }
              width={50}
            />
            <p className="font-bold">BAZAR</p>
          </NextLink>
        </NavbarBrand>
        <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-blue-600 data-[active=true]:font-medium",
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
            {/*      {user?.role === "VENDOR" && (
              <NavbarItem>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-blue-600 data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={"/dashboard/vendor"}
                >
                  Vendor Dashboard
                </NextLink>
              </NavbarItem>
            )} */}
            {/*   {user?.role === "ADMIN" && (
              <NavbarItem>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-blue-600 data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={"/dashboard/admin"}
                >
                  Admin Dashboard
                </NextLink>
              </NavbarItem>
            )} */}
            {/*      {user?.role === "CUSTOMER" && (
              <NavbarItem>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-blue-600 data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={"/order-history"}
                >
                  Order History
                </NextLink>
              </NavbarItem>
            )} */}
          </ul>
          <NavbarItem>
            <ShopDropDown />
          </NavbarItem>
          <NavbarItem>
            <CategoriesDropDown />
          </NavbarItem>
          <NavbarItem>
            <PagesDropDown />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="">
            {user && user.email && (
              <NavbarDropdown setIsLoading={setIsLoading} user={user} />
            )}
          </NavbarItem>
          <NavbarItem>
            <Cart />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="text-gray-600 hover:text-blue-600"
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>

      {pathname === "/" && <GetProductBYSearch />}
    </>
  );
};
