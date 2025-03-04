"use client";

import dynamic from "next/dynamic";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";

import { DeleteIcon } from "@/src/components/icons";
import { useAllVendorInfo, useVendorBlacklist } from "@/src/hooks/user.hook";
import { User } from "@/src/types";

const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  { ssr: false },
);

export default function ALlUsersTable() {
  const { data, isPending } = useAllVendorInfo();
  const { mutate: handleBlacklist } = useVendorBlacklist();

  const handleUpdateVendorStatus = (id: number, isBlacklisted: boolean) => {
    // handleUserStatusUpdate({ userData: { status }, id: id });
    handleBlacklist({ userData: { isBlacklisted }, id: id });
  };

  return (
    <>
      {isPending && <DynamicLoading />}
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Image</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ADDRESS</TableColumn>
          <TableColumn>PHONE</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.data?.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar
                  className="w-20 h-20 text-large"
                  src={user?.vendor?.logo}
                />
              </TableCell>
              <TableCell>{user?.vendor?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.vendor?.location}</TableCell>
              <TableCell>{user?.vendor?.phone}</TableCell>
              <TableCell className="uppercase">{user?.role}</TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  color={!user.vendor?.isBlacklisted ? "success" : "danger"}
                  size="sm"
                  variant="flat"
                >
                  {user.vendor?.isBlacklisted ? "BLACKLISTED" : "ACTIVE"}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  {/* <UpdateUserForm user={user} /> */}
                  {!user?.vendor?.isBlacklisted ? (
                    <Button
                      isIconOnly
                      className="bg-transparent"
                      onClick={() => handleUpdateVendorStatus(user?.id, true)}
                    >
                      <Tooltip color="danger" content="Blacklist Vendor">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                          <DeleteIcon />
                        </span>
                      </Tooltip>
                    </Button>
                  ) : (
                    <Button
                      color="success"
                      radius="full"
                      size="sm"
                      variant="solid"
                      onClick={() => handleUpdateVendorStatus(user?.id, false)}
                    >
                      Active
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
