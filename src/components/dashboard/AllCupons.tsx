"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

import CuponProductsModal from "@/src/components/dashboard/CuponProductsModal";
import Loading from "@/src/components/ui/shared/Loading";
import {
  useDeleteCupon,
  useGetAllCupons,
  useUpdateCupon,
} from "@/src/hooks/cupon.hook";
import { TCupon } from "@/src/types";
import { DeleteIcon } from "@/src/components/icons";

export default function AllCupons() {
  const { data, isPending } = useGetAllCupons();
  const router = useRouter();
  const { mutate: updateCupon, isPending: updateCuponPending } =
    useUpdateCupon();
  const { mutate: deleteCupon } = useDeleteCupon();
  const [id, setId] = useState<null | number>(null);

  const handleUpdateCuponStatus = (status: string, id: number) => {
    setId(id);
    if (status === "ACTIVE") {
      updateCupon({
        id: id,
        cuponData: {
          isActive: true,
        },
      });
    } else {
      updateCupon({
        id: id,
        cuponData: {
          isActive: false,
        },
      });
    }
  };
  const handleDeleteCupon = (id: number) => {
    const isConfirm = confirm("Cupon will be deleted?");

    if (isConfirm) {
      deleteCupon({ id });
    }
  };

  if (isPending) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mt-4 py-8 px-4">
        <div className="text-lg font-semibold ">All Cupons</div>
        <Button
          className="flex items-center space-x-2 bg-default-900 text-default"
          onClick={() => router.push(`/dashboard/vendor/manage-cupons/add`)}
        >
          <FaPlus /> {/* Plus icon from React Icons */}
          <span>Add Coupon</span>
        </Button>
      </div>
      <Table aria-label="Coupon and Applied Products Table">
        <TableHeader>
          <TableColumn>COUPON CODE</TableColumn>
          <TableColumn>DISCOUNT AMOUNT</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>Applied Products</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.data?.map(
            (cupon: TCupon) => (
              <TableRow key={cupon.id}>
                <TableCell>{cupon.code}</TableCell>
                <TableCell>${cupon.discountAmount}</TableCell>
                <TableCell>{cupon.isActive ? "Active" : "Inactive"}</TableCell>
                <TableCell>
                  {new Date(cupon.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <CuponProductsModal
                    key={cupon.id}
                    products={cupon?.appliedProducts}
                  />
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    {/* <UpdateUserForm user={user} /> */}
                    {cupon.isActive ? (
                      <Button
                        className="mr-5"
                        color="danger"
                        radius="full"
                        size="sm"
                        variant="solid"
                        onClick={() =>
                          handleUpdateCuponStatus("DEACTIVE", cupon.id)
                        }
                      >
                        {id === cupon?.id && updateCuponPending
                          ? "Loading..."
                          : "Deactive"}
                      </Button>
                    ) : (
                      <Button
                        className="mr-5"
                        color="success"
                        radius="full"
                        size="sm"
                        variant="solid"
                        onClick={() =>
                          handleUpdateCuponStatus("ACTIVE", cupon.id)
                        }
                      >
                        {id === cupon?.id && updateCuponPending
                          ? "Loading..."
                          : "Active"}
                      </Button>
                    )}
                    <Tooltip color="danger" content="Delete cupon">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon
                          onClick={() => handleDeleteCupon(cupon.id)}
                        />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ),
            // ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
