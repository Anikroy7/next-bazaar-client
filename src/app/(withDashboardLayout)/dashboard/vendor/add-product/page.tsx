"use client";

import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { MdClose, MdOutlineAttachment } from "react-icons/md";
import { Suspense, useEffect, useState } from "react";
import { Badge } from "@nextui-org/badge";
import { Avatar } from "@nextui-org/avatar";
import { useRouter, useSearchParams } from "next/navigation";

import NBForm from "@/src/components/ui/form/NBForm";
import NBInput from "@/src/components/ui/form/NBInput";
import NBTextArea from "@/src/components/ui/form/NBTextArea";
import { useGetAllCategories } from "@/src/hooks/category.hook";
import NBSelect from "@/src/components/ui/form/NBSelect";
import { createProductValidationSchema } from "@/src/validation/product.validation";
import {
  useCreateProduct,
  useGetSingleProduct,
} from "@/src/hooks/product.hook";
import { useGetLoogedUserInfo } from "@/src/hooks/user.hook";
import { uploadMultipleImages } from "@/src/utils/uploadMultipleImages";

const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  {
    ssr: false,
  },
);

function AddProductForm() {
  const router = useRouter();
  const queryParams = useSearchParams();

  const [id, setId] = useState(queryParams.get("productLike"));
  const [avatarPreview, setAvatarPreview] = useState<string[]>([]);
  const { data: productData, isPending: productPending } =
    useGetSingleProduct(id);
  const { data: loggedUser, isPending: userInfoPending } =
    useGetLoogedUserInfo();
  const [images, setImages] = useState<File[]>([]);
  const { data, isPending } = useGetAllCategories();

  const {
    mutate: handleCreateProduct,
    data: createdProduct,
    isPending: createProductPending,
    isSuccess: createProductSuccess,
  } = useCreateProduct();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allFiles = e.target.files;

    if (allFiles?.length) {
      for (let i = 0; i < allFiles.length; i++) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setAvatarPreview((prev) => [...prev, reader.result as string]);
          setImages((prev) => [...prev, allFiles[i] as File]);
        };
        reader.readAsDataURL(allFiles[i]);
      }
    }
  };

  const handleRemoveImage = (ind: number) => {
    setAvatarPreview([
      ...avatarPreview.filter((image, index) => index !== ind),
    ]);
    setImages([...images.filter((image, index) => index !== ind)]);
  };

  useEffect(() => {
    if (!createProductPending && createdProduct && createProductSuccess) {
      router.push("/dashboard/vendor");
    }
  }, [createdProduct, createProductPending, createProductSuccess]);

  useEffect(() => {
    if (!productPending && productData) {
      // setId(id)
      setId(productData.data.id);
    }
  }, [parseInt(queryParams.get("productLike") as string), id]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!images.length) {
      confirm("At least one image must be provided!!");

      return;
    }
    const imageUrls = await uploadMultipleImages(images);

    handleCreateProduct({
      ...data,
      images: imageUrls,
      categoryId: parseInt(data.categoryId),
      inventorCount: parseInt(data.inventorCount),
      price: parseInt(data.price),
      discount: data.discount ? parseInt(data.discount) : 0,
      vendorId: loggedUser?.data.id,
    });
  };

  if (isPending || userInfoPending || productPending) return <DynamicLoading />;

  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className="w-[70%] p-6 rounded-lg shadow-lg">
        <h4 className="text-center font-bold ">Add Product</h4>
        <NBForm
          defaultValues={{
            name: productData?.data.name,
            description: productData?.data?.description,
            inventorCount: productData?.data?.inventorCount,
            price: productData?.data?.price,
            discount: productData?.data?.discount || 0,
            categoryId: productData?.data?.cateogoryId,
          }}
          resolver={zodResolver(createProductValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="py-3">
            <NBSelect
              label="Category"
              name="categoryId"
              options={data?.data}
              size="sm"
            />
          </div>
          <div className="py-3">
            <NBInput label="Name" name="name" size="sm" />
          </div>

          <div className="py-3">
            <NBTextArea label="Description" name="description" size="sm" />
          </div>
          <div className="py-3">
            <NBInput
              label="Inverntor Count"
              name="inventorCount"
              size="sm"
              type="number"
            />
          </div>
          <div className="py-3">
            <NBInput
              label="Original Price"
              name="price"
              size="sm"
              type="number"
            />
          </div>
          <div className="py-3">
            <NBInput
              label="Discount (% If have) "
              name="discount"
              size="sm"
              type="number"
            />
          </div>

          {/* //Image upload */}
          <div className="mt-4">
            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-5\800 transition duration-300 ease-in-out ">
              <div className="flex flex-col items-center justify-center">
                {/* Attachment Icon from React Icons */}
                <MdOutlineAttachment className="w-8 h-8 text-gray-400" />
                <span className="text-sm font-medium text-gray-500">
                  click to upload
                </span>
              </div>
              <input
                multiple
                className="hidden"
                type="file"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <div className="my-3 flex flex-wrap gap-5">
            {avatarPreview.map((a, index) => (
              <Badge
                key={index}
                className="cursor-pointer"
                color="danger"
                content={<MdClose className="text-white " />}
                size="lg"
                onClick={() => handleRemoveImage(index)}
              >
                <Avatar className="h-40 w-40" radius="md" src={a} />
              </Badge>
            ))}
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 text-default"
            size="lg"
            type="submit"
          >
            Add
          </Button>
        </NBForm>
      </div>
    </section>
  );
}

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddProductForm />
    </Suspense>
  );
};

export default Page;
