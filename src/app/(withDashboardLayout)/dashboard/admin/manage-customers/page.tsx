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
import {
  useAllCustomerInfo,
  useUpdateRole,
  useUpdateStatus,
} from "@/src/hooks/user.hook";
import { User } from "@/src/types";

const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  { ssr: false },
);

export default function ALlUsersTable() {
  const { data, isPending } = useAllCustomerInfo();
  const { mutate: handleUserStatusUpdate } = useUpdateStatus();
  const { mutate: handleUserRoleUpdate } = useUpdateRole();

  const handleUpdateUserStatus = (id: number, status: "ACTIVE" | "BLOCKED") => {
    handleUserStatusUpdate({ userData: { status }, id: id });
  };
  const handleUpdateUserRole = (id: number, role: "ADMIN" | "CUSTOMER") => {
    handleUserRoleUpdate({ userData: { role }, id: id });
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
                  src={user?.customer?.profileImage}
                />
              </TableCell>
              <TableCell>{user?.customer?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.customer?.address}</TableCell>
              <TableCell>{user?.customer?.phone}</TableCell>
              <TableCell className="uppercase">CUSTOMER</TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  color={user.status === "ACTIVE" ? "success" : "danger"}
                  size="sm"
                  variant="flat"
                >
                  {user?.status}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  {/* <UpdateUserForm user={user} /> */}
                  {user?.status === "ACTIVE" ? (
                    <Button
                      isIconOnly
                      className="bg-transparent"
                      onClick={() =>
                        handleUpdateUserStatus(user?.id, "BLOCKED")
                      }
                    >
                      <Tooltip color="danger" content="Block user">
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
                      onClick={() => handleUpdateUserStatus(user?.id, "ACTIVE")}
                    >
                      Active
                    </Button>
                  )}
                  {user?.role === "ADMIN" ? (
                    <Button
                      color="secondary"
                      radius="full"
                      size="sm"
                      variant="solid"
                      onClick={() => handleUpdateUserRole(user?.id, "CUSTOMER")}
                    >
                      Make user
                    </Button>
                  ) : (
                    <Button
                      color="warning"
                      radius="full"
                      size="sm"
                      variant="solid"
                      onClick={() => handleUpdateUserRole(user?.id, "ADMIN")}
                    >
                      Make admin
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
