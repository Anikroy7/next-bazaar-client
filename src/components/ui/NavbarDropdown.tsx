"use client";

import { Button } from "@nextui-org/button";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/dropdown";

import { useRouter } from "next/navigation";


export default function NavbarDropdown() {
    const router = useRouter();

    const handleNavigation = (pathname: string) => {
        router.push(pathname);
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="bordered">SIGNUP</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="profile" onClick={() => handleNavigation("/signup/vendor")}>
                    As a Vendor
                </DropdownItem>
                <DropdownItem key={"settings"} onClick={() => handleNavigation("/signup/customer")}>
                    As a Customer
                </DropdownItem>
               {/*  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                >
                    Logout
                </DropdownItem> */}
            </DropdownMenu>
        </Dropdown>
    );
}
