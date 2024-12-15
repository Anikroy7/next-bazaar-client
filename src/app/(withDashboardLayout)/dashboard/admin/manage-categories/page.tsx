"use client";
import { Tooltip } from "@nextui-org/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  useDelteCategory,
  useGetAllCategories,
} from "@/src/hooks/category.hook";
import { DeleteIcon } from "@/src/components/icons";

export default function Page() {
  const { data } = useGetAllCategories();
  const router = useRouter();

  const { mutate: handleDeleteCategory } = useDelteCategory();

  // Fallback if no data
  const categories = data?.data || [];

  return (
    <div className="relative my-10">
      <div className="flex justify-between items-center mb-4 px-6">
        <h4 className="text-xl font-bold">All Categories</h4>
        <button
          className="my-3 p-2 rounded-md bg-default-900 text-default"
          onClick={() => router.push("/dashboard/admin/manage-categories/add")}
        >
          <span>+ Add Category</span>
        </button>
      </div>

      <Table aria-label="Categories Table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>IMAGE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {categories.map((category: any) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Image
                  alt={category.name}
                  className="h-10 w-10 object-cover rounded-md"
                  height={40}
                  src={category.image}
                  width={40}
                />
              </TableCell>
              <TableCell>{category.isDeleted ? "Deleted" : "Active"}</TableCell>
              <TableCell>
                <Tooltip color="danger" content="Delete category">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon
                      onClick={() => handleDeleteCategory({ id: category.id })}
                    />
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
