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
import { useGetAllPaymentInfo } from "@/src/hooks/payment.hook";
import { TPayment } from "@/src/types";


const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  { ssr: false },
);

export default function Page() {
  const { data, isPending } = useGetAllPaymentInfo()
  if (isPending) return <DynamicLoading />
  console.log(data)
  return (
    <>
      {isPending && <DynamicLoading />}

      <Table aria-label="Order Payment Information Table">
        <TableHeader>
          <TableColumn>Payment Id</TableColumn>
          <TableColumn>Customer Name</TableColumn>
          <TableColumn>Customer Email</TableColumn>
          <TableColumn>Customer Address</TableColumn>
          <TableColumn>Total Price</TableColumn>
          <TableColumn>Payment Status</TableColumn>
          <TableColumn>Transaction ID</TableColumn>
          <TableColumn>Order Date</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.data?.map((item:TPayment) => (
            <TableRow key={item.id}>
              <TableCell>{item?.id}</TableCell>
              <TableCell>{item?.order?.customerName}</TableCell>
              <TableCell>{item?.order?.customerEmail}</TableCell>
              <TableCell>{item?.order?.customerAddress}</TableCell>
              <TableCell>{item?.order?.totalPrice}</TableCell>
              <TableCell>{item.paymentStatus}</TableCell>
              <TableCell>{item.transactionId}</TableCell>
              <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <Button
                  isIconOnly
                  className="bg-transparent"
                >
                  <Tooltip color="danger" content="Cancel Payment">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon />
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
