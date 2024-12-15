"use client";

import dynamic from "next/dynamic";
import { Avatar } from "@nextui-org/avatar";
import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import { MdOutlineAttachment } from "react-icons/md";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import NBForm from "@/src/components/ui/form/NBForm";
import NBInput from "@/src/components/ui/form/NBInput";
import uploadImage from "@/src/utils/uploadImage";
import { useCreateCategory } from "@/src/hooks/category.hook";

const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  { ssr: false },
);

export default function AddCategoryPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const {
    mutate: handleCreateCategory,
    data: createdData,
    isSuccess,
    isPending,
  } = useCreateCategory();

  useEffect(() => {
    if (!isPending && createdData && isSuccess) {
      router.push("/dashboard/admin/manage-categories");
    }
  }, [isSuccess, createdData, isPending, router]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!imageFile) {
      alert("Please provide a category image");

      return;
    }
    const imageUrl = await uploadImage(imageFile);

    data.profileImage = imageUrl;
    handleCreateCategory({
      name: data.name,
      image: imageUrl,
    });
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImageFile(file);
      const reader = new FileReader();

      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (isPending) return <DynamicLoading />;

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-6">Add Category</h1>
      <div className="w-[50%]">
        <NBForm onSubmit={onSubmit}>
          <div className="py-3">
            <NBInput label="Name" name="name" size="sm" />
          </div>
          <div className="mt-4">
            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-500 transition duration-300 ease-in-out">
              <div className="flex flex-col items-center justify-center">
                <MdOutlineAttachment className="w-8 h-8 text-gray-400" />
                <span className="text-sm font-medium text-gray-500">
                  Click to upload
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
          <div className="my-3">
            {selectedImage && (
              <Badge className="cursor-pointer" color="danger" size="lg">
                <Avatar className="h-28 w-28" radius="md" src={selectedImage} />
              </Badge>
            )}
          </div>
          <Button
            className="my-3 w-full rounded-md bg-default-900 text-default"
            size="lg"
            type="submit"
          >
            Update
          </Button>
        </NBForm>
      </div>
    </div>
  );
}
