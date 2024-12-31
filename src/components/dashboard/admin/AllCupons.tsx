"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/table";
import dynamic from "next/dynamic";
import { Tooltip } from "@nextui-org/tooltip";
import { useRouter } from "next/navigation";

import { DeleteIcon, EditIcon } from "../../icons";

import { useDeleteProduct, useGetAllProducts } from "@/src/hooks/product.hook";
import { TProduct } from "@/src/types";
import { useDeleteCupon, useGetAllCupons } from "@/src/hooks/cupon.hook";

const DynamicLoading = dynamic(
    () => import("@/src/components/ui/shared/Loading"),
    {
        ssr: false,
    },
);

export default function AllCupons() {
    const { data, isPending } = useGetAllCupons();
    const router = useRouter();
    const { mutate: deleteProduct } = useDeleteCupon();

    const cupons = data?.data?.data || [];
    console.log(cupons)
    const handleDeleteProduct = (id: number) => {
        const isConfirm = confirm("Are you want to sure delete the product?");

        if (isConfirm) {
            deleteProduct({
                id: id,
            });
        }
    };

    if (isPending) return <DynamicLoading />;

    return (
        <>
            <h4 className="text-xl font-bold text-center my-3">All Products</h4>
            {/*  <Table aria-label="Products Table">
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>PRICE</TableColumn>
                    <TableColumn>INVENTORY</TableColumn>
                    <TableColumn>VENDOR ID</TableColumn>
                    <TableColumn>CREATED AT</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                    {products.map((product: TProduct) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>${product.price}</TableCell>
                            <TableCell>{product.inventorCount}</TableCell>
                            <TableCell>{product.vendorId}</TableCell>
                            <TableCell>
                                {new Date(product.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="flex items-center gap-2">
                                <Tooltip content="Edit product">
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <EditIcon
                                            onClick={() =>
                                                router.push(
                                                    `/dashboard/admin/manage-products/edit/${product.id}`,
                                                )
                                            }
                                        />
                                    </span>
                                </Tooltip>
                                <Tooltip color="danger" content="Delete product">
                                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                        <DeleteIcon
                                            onClick={() => handleDeleteProduct(product.id)}
                                        />
                                    </span>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table> */}
        </>
    );
}
