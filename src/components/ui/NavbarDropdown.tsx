"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

import { logoutUser } from "@/src/services/auth.service";
import { IUser } from "@/src/context/user.prodvier";

type INavbarDropdown = {
  user: IUser;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const NavbarDropdown: React.FC<INavbarDropdown> = ({ user, setIsLoading }) => {
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
    setIsLoading(true);
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <div className="flex items-center cursor-pointer ">
          <h2 className="text-orange-600 underline">{user?.email}</h2>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user?.email}</p>
        </DropdownItem>
        <DropdownItem
          key="settings"
          className={`${user?.role !== "CUTOMER" && "hidden"}`}
          onClick={() => router.push("/profile")}
        >
          My Profile
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
  );
};

export default NavbarDropdown;
