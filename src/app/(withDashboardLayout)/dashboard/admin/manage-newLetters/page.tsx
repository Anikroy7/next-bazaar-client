"use client";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { useRouter } from "next/navigation";
import React from "react";

import {
  useDeleteNewsLetter,
  useGetAllNewsLetters,
} from "@/src/hooks/newLettter.hook";
import Loading from "@/src/components/ui/shared/Loading";
import { VerticalDotsIcon } from "@/src/components/icons";

export default function LetterPage() {
  const router = useRouter();
  const { mutate: deleteNL } = useDeleteNewsLetter();
  const { data, isPending } = useGetAllNewsLetters();

  if (isPending) return <Loading />;
  const letters = data?.data || [];

  const handleDeleteNL = (id: number) => {
    const isConfirm = confirm("Are you want to delete sure?");

    if (isConfirm) {
      deleteNL({ id });
    }
  };

  return (
    <div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Letter id</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        {letters.length > 0 ? (
          <TableBody>
            {letters.map((letter: { id: number; email: string }) => (
              <TableRow key={letter.id}>
                <TableCell>{letter.id}</TableCell>
                <TableCell>{letter.email}</TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          <VerticalDotsIcon className="text-default-900" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem
                          key="send"
                          onClick={() =>
                            router.push(
                              `/dashboard/admin/manage-newLetters/send?email=${letter.email}`,
                            )
                          }
                        >
                          Send Message
                        </DropdownItem>
                        <DropdownItem
                          key="delete"
                          onClick={() => handleDeleteNL(letter.id)}
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        )}
      </Table>
    </div>
  );
}
