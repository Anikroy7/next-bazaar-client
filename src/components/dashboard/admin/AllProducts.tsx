"use client"
import { useDeleteProduct, useGetAllProducts } from "@/src/hooks/product.hook";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import dynamic from "next/dynamic";
import { Tooltip } from "@nextui-org/tooltip";
import { DeleteIcon, EditIcon } from "../../icons";
import { useRouter } from "next/navigation";
import { TProduct } from "@/src/types";

const DynamicLoading = dynamic(() => import('@/src/components/ui/shared/Loading'), {
  ssr: false,
})
export default function AllProducts() {
  const { data, isPending } = useGetAllProducts();
  const router = useRouter()
  const { mutate: deleteProduct, data: delteData, isPending: dletependign, error: dleteErir } = useDeleteProduct()


  // Assuming data.data contains the array of products
  const products = data?.data || [];

  const handleDeleteProduct = (id: number) => {
    const isConfirm = confirm("Are you want to sure delete the product?")

    if (isConfirm) {
      deleteProduct({
        id: id
      })
    }
  }

  console.log(delteData, dletependign, dleteErir)

  if (isPending) return <DynamicLoading />;
  return (
    <>
      <h4 className="text-xl font-bold text-center my-3">All Products</h4>
      <Table aria-label="Products Table">
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
              <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Tooltip content="Edit user">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon  onClick={() => router.push(`/dashboard/admin/manage-products/edit/${product.id}`)}/>
                  </span>
                </Tooltip>
                <Tooltip  color="danger" content="Delete product">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon onClick={() => handleDeleteProduct(product.id)}/>
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
