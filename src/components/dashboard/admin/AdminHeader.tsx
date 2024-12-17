"use client";

import { Navbar, NavbarContent } from "@nextui-org/navbar";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { useUser } from "@/src/context/user.prodvier";
import { logoutUser } from "@/src/services/auth.service";

const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  { ssr: false },
);

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function AdminHeader() {
  const router = useRouter();

  const { user, isLoading, setIsLoading } = useUser();
  const handleLogout = () => {
    logoutUser();
    router.push("/login");
    setIsLoading(true);
  };

  if (isLoading) return <DynamicLoading />;

  return (
    <Navbar>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>

            <DropdownItem
              key="logout"
              color="danger"
              onClick={() => handleLogout()}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
