"use client"

import NBForm from "@/src/components/ui/form/NBForm";
import NBInput from "@/src/components/ui/form/NBInput";
import dynamic from "next/dynamic";

const DynamicLoading = dynamic(() => import('@/src/components/ui/shared/Loading'), {
    ssr: false,
})
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import uploadImage from "@/src/utils/uploadImage";
import { MdOutlineAttachment } from "react-icons/md";
import { Badge } from "@nextui-org/badge";
import { Avatar } from "@nextui-org/avatar";
import { useCreateCategory } from "@/src/hooks/category.hook";


export default function page() {

    const router = useRouter()
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null)
    const { mutate: handleCreateCategory, data: createdData, isSuccess, isPending } = useCreateCategory()
    useEffect(() => {
        if (!isPending && createdData && isSuccess) {
            router.push('/dashboard/admin/manage-categories');
        }
    }, [isSuccess, createdData, isPending])

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // console.log(imageFile)
        if (!imageFile) {
            alert("Please give category image")
            return;
        }
        const imageUrl = await uploadImage(imageFile)
        data.profileImage = imageUrl
        handleCreateCategory({
            name: data.name,
            image: imageUrl
        })
        console.log(data)
    }


    //image preview 

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file)
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    if (isPending) return <DynamicLoading />

    console.log('get creat category dastra', createdData, isSuccess, isPending)
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold mb-6">Add Category</h1>

            <div className="w-[50%]">
                <NBForm
                    onSubmit={onSubmit}

                >
                    <div className="py-3">
                        <NBInput label="Name" name="name" size="sm" />
                    </div>
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
                    <div className="my-3">
                        {selectedImage && <Badge
                            className="cursor-pointer"
                            color="danger"
                            size="lg"
                        >
                            <Avatar className="h-28 w-28" radius="md" src={selectedImage as string} />
                        </Badge>}
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
