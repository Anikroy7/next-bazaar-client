"use client";

import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import dynamic from "next/dynamic";
import React from "react";

import {  TReviewTwo } from "@/src/types";
import {
  useDeleteProductReview,
  useGetAllProductReviews,
} from "@/src/hooks/productReview.hook";
import { DeleteIcon } from "@/src/components/icons";
const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  { ssr: false },
);

export default function Page() {
  const { data, isPending } = useGetAllProductReviews();
  const { mutate: deletePRHandeler } = useDeleteProductReview();

  if (isPending) return <DynamicLoading />;
  const handleDeletePr = (id: number) => {
    deletePRHandeler({ id });
  };

  return (
    <>
      <Table aria-label="Customer Review Information Table">
        <TableHeader>
          <TableColumn>Ratings Id</TableColumn>
          <TableColumn>Customer Name</TableColumn>
          <TableColumn>Customer Email</TableColumn>
          <TableColumn>Customer Address</TableColumn>
          <TableColumn>Ratings</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.data?.map((item: TReviewTwo) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.customer?.name}</TableCell>
              <TableCell>{item.customer?.email}</TableCell>
              <TableCell>{item.customer?.address}</TableCell>
              <TableCell>{item.ratings}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <Button isIconOnly className="bg-transparent">
                  <Tooltip color="danger" content="Delete">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon onClick={() => handleDeletePr(item.id)} />
                    </span>
                  </Tooltip>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
