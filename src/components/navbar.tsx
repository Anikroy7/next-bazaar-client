'use client'

import dynamic from 'next/dynamic'

const DynamicLoading = dynamic(() => import('./ui/shared/Loading'), {
  ssr: false,
})
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

import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import {
  Logo,
} from "@/src/components/icons";
import { useRouter } from "next/navigation";
import { useUser } from "../context/user.prodvier";
import NavbarDropdown from './ui/NavbarDropdown';
import Image from 'next/image';

export const Navbar = () => {
  const router = useRouter();
  const { user, isLoading, setIsLoading } = useUser();

  if (isLoading) return <DynamicLoading />
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              src={'https://pbs.twimg.com/profile_images/1565710214019444737/if82cpbS_400x400.jpg'}
              width={50}
              height={50}
              alt={"NEXT BAZAR"}
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
          {
            (user && user.email) ? <NavbarDropdown user={user} setIsLoading={setIsLoading} /> : <>
              <Button
                isExternal
                as={Link}
                className="text-sm font-normal text-default-600 bg-default-100 me-3"
                // href={siteConfig.links.sponsor}
                onClick={() => router.push('/signup')}
                variant="flat"
              >
                Signup
              </Button>
              <Button
                isExternal
                as={Link}
                className="text-sm font-normal text-default-600 bg-default-100"
                // href={siteConfig.links.sponsor}
                onClick={() => router.push('/login')}
                variant="flat"
              >
                Login
              </Button>
            </>
          }
          {/* <NavbarDropdown/> */}

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
  );
};
