"use client";

import { Button } from "@nextui-org/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import NBForm from "@/src/components/ui/form/NBForm";
import NBInput from "@/src/components/ui/form/NBInput";
import NBTextArea from "@/src/components/ui/form/NBTextArea";
import { useGetAllCategories } from "@/src/hooks/category.hook";
import NBSelect from "@/src/components/ui/form/NBSelect";
import dynamic from "next/dynamic";
import { MdClose, MdOutlineAttachment } from "react-icons/md";
import { Badge } from "@nextui-org/badge";
import { Avatar } from "@nextui-org/avatar";
import { createProductValidationSchema } from "@/src/validation/product.validation";
import { useGetSingleProduct, useUpdateProduct } from "@/src/hooks/product.hook";
import { uploadMultipleImages } from "@/src/utils/uploadMultipleImages";

const DynamicLoading = dynamic(() => import('@/src/components/ui/shared/Loading'), {
    ssr: false,
});

const UpdateProduct = ({ id }: { id: string }) => {
    const router = useRouter();
    const [avatarPreview, setAvatarPreview] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const [shouldReload, setShouldReload] = useState(false);

    const { data: productData, isPending: productPending } = useGetSingleProduct(id);
    const { data, isPending } = useGetAllCategories();
    const { mutate: handleUpdateProduct, isPending: updateProductPending, data: updatedProductData } = useUpdateProduct(id)
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
        setAvatarPreview((prev) => prev.filter((_, index) => index !== ind));
        setImages((prev) => prev.filter((_, index) => index !== ind));
    };

    useEffect(() => {
        if (!updateProductPending && updatedProductData) {
            router.push('/dashboard/vendor');
        }
    }, [updatedProductData, updateProductPending])
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        if (images.length) {
            const imageUrls = await uploadMultipleImages(images);
            data.images = imageUrls
        }
        handleUpdateProduct({
            ...data,
            categoryId: parseInt(data.categoryId),
            inventorCount: parseInt(data.inventorCount),
            price: parseInt(data.price),
            discount: data.discount ? parseInt(data.discount) : 0,
        })

    };

    if (isPending || productPending || !productData || updateProductPending) {
        return <DynamicLoading />;
    }
    console.log(updateProductPending, updatedProductData)
    return (
        <section className="flex justify-center items-center min-h-screen">
            <div className="w-[70%] p-6 rounded-lg shadow-lg">
                <h4 className="text-center font-bold">Update Product</h4>
                <NBForm
                    onSubmit={onSubmit}
                    // resolver={zodResolver(createProductValidationSchema)}
                    defaultValues={{
                        name: productData?.data.name,
                        description: productData?.data?.description,
                        inventorCount: productData?.data?.inventorCount,
                        price: productData?.data?.price,
                        discount: productData?.data?.discount || 0,
                        categoryId: productData?.data?.cateogoryId,
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
                        <NBInput label="Inventor Count" name="inventorCount" size="sm" type="string" />
                    </div>
                    <div className="py-3">
                        <NBInput label="Original Price" name="price" size="sm" type="string" />
                    </div>
                    <div className="py-3">
                        <NBInput label="Discount (%)" name="discount" size="sm" type="string" />
                    </div>
                    <h1 className="text-center font-semibold">Previous imges:</h1>
                    <div className="flex gap-4 items-center my-5">
                        {
                            productData?.data?.images.map((image: string) => <Avatar size="lg" key={image} isBordered radius="md" src={image} />)
                        }
                        {/* 
                        <Avatar isBordered radius="lg" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                        <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                        <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" /> */}
                    </div>
                    {/* Image upload */}
                    <div className="mt-4">
                        <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-500 transition duration-300 ease-in-out">
                            <div className="flex flex-col items-center justify-center">
                                <MdOutlineAttachment className="w-8 h-8 text-gray-400" />
                                <span className="text-sm font-medium text-gray-500">Click to upload</span>
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
                                content={<MdClose className="text-white" />}
                                size="lg"
                                onClick={() => handleRemoveImage(index)}
                            >
                                <Avatar className="h-40 w-40" radius="md" src={a} />
                            </Badge>
                        ))}
                    </div>

                    <Button className="my-3 w-full rounded-md bg-default-900 text-default" size="lg" type="submit">
                        Update
                    </Button>
                </NBForm>
            </div>
        </section>
    );
};

export default UpdateProduct;
