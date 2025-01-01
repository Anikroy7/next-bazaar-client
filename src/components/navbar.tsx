"use client";

import dynamic from "next/dynamic";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import Image from "next/image";
import Link from "next/link";
import { FiMail } from "react-icons/fi";
import { useEffect, useState } from "react";

import { useUser } from "../context/user.prodvier";

import Cart from "./ui/cart/Cart";
import ShopDropDown from "./ui/homepage/dropdown/ShopDropDown";
import CategoriesDropDown from "./ui/homepage/dropdown/CategoriesDropDown";

import { ThemeSwitch } from "@/src/components/theme-switch";
import GetProductBYSearch from "./ui/shared/GetProductBYSearch";

const DynamicLoading = dynamic(() => import("./ui/shared/Loading"), {
  ssr: false,
});

export const Navbar = () => {
  const { user, isLoading } = useUser();
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (isLoading) return <DynamicLoading />;

  return (
    <>
      <header className="">
        <div className="container mx-auto px-6 py-3 ">
          {/* Top Section */}
          <div className="flex items-center justify-between">
            {/* Location Icon */}
            {user && (
              <div className="hidden w-full  md:flex md:items-center">
                <div className="flex items-center space-x-1">
                  <FiMail className="h-5 w-5" />
                  <span className="text-sm">{user.email}</span>
                </div>
              </div>
            )}

            {/* Brand Logo */}
            <div className="flex justify-start items-center gap-1">
              <Link href={"/"}>
                <Image
                  alt={"NEXT BAZAR"}
                  height={50}
                  src={
                    "https://pbs.twimg.com/profile_images/1565710214019444737/if82cpbS_400x400.jpg"
                  }
                  width={50}
                />
                <p className="font-bold text-inherit">BAZAR</p>
              </Link>
            </div>

            {/* Cart & Menu */}
            <div className="flex items-center justify-end w-full ">
              {/* Cart Icon */}
              <div className="flex items-center gap-5">
                <ThemeSwitch />
                <Cart />
              </div>

              {/* Mobile Menu */}
              <div className="flex sm:hidden">
                <button
                  aria-label="toggle menu"
                  className=" hover:text-gray-500 focus:outline-none"
                  type="button"
                >
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      fillRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Navbar Links */}
          <NextUINavbar
            className={`${isFixed ? "fixed top-0 left-0 w-full shadow z-50" : "relative"} transition-all duration-300`}
          >
            <NavbarContent
              className="basis-1/5 sm:basis-full flex justify-center"
              justify="center"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center space-x-0 sm:space-x-6 mt-3 sm:mt-0">
                <Link className="hover:underline sm:mx-3 text-[16px]" href="/">
                  Home
                </Link>
                <ShopDropDown />
                <CategoriesDropDown />

                <Link className="hover:underline sm:mx-3" href="about">
                  About Us
                </Link>
                <Link className="hover:underline sm:mx-3" href="contact">
                  Contact
                </Link>
                {user?.role === "CUSTOMER" && (
                  <NavbarItem>
                    <NextLink
                      className="data-[active=true]:text-primary data-[active=true]:font-medium"
                      href={"/order-history"}
                    >
                      Order History
                    </NextLink>
                  </NavbarItem>
                )}
              </div>
            </NavbarContent>
          </NextUINavbar>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <GetProductBYSearch />

          </div>
        </div>
      </header>
    </>
  );
};

/* 


<NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
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
            <p className="font-bold text-inherit">BAZAR</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
          {user?.role === "VENDOR" && (
            <NavbarItem>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={"/dashboard/vendor"}
              >
                Vendor Dashboard
              </NextLink>
            </NavbarItem>
          )}
          {user?.role === "ADMIN" && (
            <NavbarItem>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={"/dashboard/admin"}
              >
                Admin Dashboard
              </NextLink>
            </NavbarItem>
          )}
          {user?.role === "CUSTOMER" && (
            <NavbarItem>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={"/order-history"}
              >
                Order History
              </NextLink>
            </NavbarItem>
          )}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          {user && user.email ? (
            <NavbarDropdown setIsLoading={setIsLoading} user={user} />
          ) : (
            <>
              <Button
                isExternal
                as={Link}
                className="text-sm font-normal text-default-600 bg-default-100 me-3"
                variant="flat"
                // href={siteConfig.links.sponsor}
                onClick={() => router.push("/signup")}
              >
                Signup
              </Button>
              <Button
                isExternal
                as={Link}
                className="text-sm font-normal text-default-600 bg-default-100"
                variant="flat"
                // href={siteConfig.links.sponsor}
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            </>
          )}
          {/* <NavbarDropdown/>
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


*/
