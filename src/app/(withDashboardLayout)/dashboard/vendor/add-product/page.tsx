"use client";

import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import NBForm from "@/src/components/ui/form/NBForm";
import NBInput from "@/src/components/ui/form/NBInput";
import NBTextArea from "@/src/components/ui/form/NBTextArea";
import { useGetAllCategories } from "@/src/hooks/category.hook";
import NBSelect from "@/src/components/ui/form/NBSelect";
import dynamic from "next/dynamic";
import { MdClose, MdOutlineAttachment } from "react-icons/md";
import { useEffect, useState } from "react";
import { Badge } from "@nextui-org/badge";
import { Avatar } from "@nextui-org/avatar";
import { createProductValidationSchema } from "@/src/validation/product.validation";
import { useCreateProduct } from "@/src/hooks/product.hook";
import { useGetLoogedUserInfo } from "@/src/hooks/user.hook";
import { uploadMultipleImages } from "@/src/utils/uploadMultipleImages";
import { useRouter } from "next/navigation";


const DynamicLoading = dynamic(() => import('@/src/components/ui/shared/Loading'), {
    ssr: false,
})


export default function Page() {
    const router = useRouter()
    const [avatarPreview, setAvatarPreview] = useState<string[]>([]);
    const { data: loggedUser, isPending: userInfoPending } = useGetLoogedUserInfo()
    const [images, setImages] = useState<File[]>([]);
    const { data, isPending } = useGetAllCategories();
    const { mutate: handleCreateProduct, data: createdProduct, isPending: createProductPending, isSuccess: createProductSuccess } = useCreateProduct()

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
            router.push('/dashboard/vendor');
        }
    }, [createdProduct, createProductPending, createProductSuccess])

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!images.length) {
            alert("At least one image must be provided!!")
            return
        };
        console.log(data, images)
        const imageUrls = await uploadMultipleImages(images)
        handleCreateProduct({
            ...data,
            images: imageUrls,
            categoryId: parseInt(data.categoryId),
            inventorCount: parseInt(data.inventorCount),
            price: parseInt(data.price),
            discount: data.discount ? parseInt(data.discount) : 0,
            vendorId: loggedUser?.data.id
        })
    }
    if (isPending || userInfoPending) return <DynamicLoading />
    console.log(loggedUser, createdProduct, createProductPending, createProductSuccess)
    return (
        <section className="flex justify-center items-center min-h-screen">
            <div className="w-[70%] p-6 rounded-lg shadow-lg">
                <h4 className="text-center font-bold ">
                    Add Product
                </h4>
                <NBForm
                    onSubmit={onSubmit}
                    resolver={zodResolver(createProductValidationSchema)}
                    defaultValues={{
                        name: "product 1",
                        description: "this is product 1",
                        inventorCount: '23',
                        price: '230',

                    }}
                >
                    <div className="py-3">
                        <NBSelect options={data?.data} label="Category" name="categoryId" size="sm" />
                    </div>
                    <div className="py-3">
                        <NBInput label="Name" name="name" size="sm" />
                    </div>

                    <div className="py-3">
                        <NBTextArea label="Description" name="description" size="sm" />
                    </div>
                    <div className="py-3">
                        <NBInput label="Inverntor Count" name="inventorCount" size="sm" type="number" />
                    </div>
                    <div className="py-3">
                        <NBInput label="Original Price" name="price" size="sm" type="number" />
                    </div>
                    <div className="py-3">
                        <NBInput
                            label="Discount (% If have) "
                            name="discount"
                            size="sm"
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
