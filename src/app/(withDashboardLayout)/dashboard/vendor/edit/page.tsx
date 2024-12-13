"use client"

import NBForm from "@/src/components/ui/form/NBForm";
import NBInput from "@/src/components/ui/form/NBInput";
import dynamic from "next/dynamic";

const DynamicLoading = dynamic(() => import('@/src/components/ui/shared/Loading'), {
    ssr: false,
})
import { useGetLoogedUserInfo, useUpdateVendor } from "@/src/hooks/user.hook";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateVendorValidationSchema } from "@/src/validation/auth.validation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import uploadImage from "@/src/utils/uploadImage";
import NBTextArea from "@/src/components/ui/form/NBTextArea";


export default function page() {

    const router = useRouter()
    const { data, isLoading } = useGetLoogedUserInfo();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null)
    const { mutate: handleUpdateVendor, data: updateData, isSuccess, isPending } = useUpdateVendor()
    useEffect(() => {
        if (!isPending && data && isSuccess) {
            router.push('/dashboard/vendor');
        }
    }, [isSuccess, data, isPending])

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        if (imageFile) {
            const imageUrl = await uploadImage(imageFile)
            data.logo = imageUrl
        }
        // console.log(data)
        handleUpdateVendor(data)  
    }


    //image preview 

    const handleImagePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    if (isLoading) return <DynamicLoading />

    console.log('get lgged user dastra', updateData, isSuccess, isPending)
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold mb-6">My profile</h1>


            {/* Image Upload Field */}
            <div className="flex flex-col items-center mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                <div className="relative w-32 h-32">
                    <img
                        src={selectedImage || data?.data.logo} // Show uploaded image or placeholder
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover border border-gray-300"
                    />
                    <label
                        htmlFor="image-upload"
                        className="absolute bottom-0 right-0 bg-blue-500 text-white text-sm px-2 py-1 rounded-md cursor-pointer hover:bg-blue-600"
                    >
                        Upload
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImagePreview}
                    />
                </div>
                <p className="text-sm text-gray-500 mt-2">Supported formats: JPG, PNG, JPEG</p>
            </div>


            <div className="w-[50%]">
                <NBForm
                    onSubmit={onSubmit}
                    defaultValues={{
                        name: data?.data?.name,
                        email: data?.data?.email,
                        location: data?.data?.location,
                        phone: data?.data?.phone,
                        description: data?.data?.description
                    }}
                    resolver={zodResolver(updateVendorValidationSchema)}
                >
                    <div className="py-3">
                        <NBInput label="Name" name="name" size="sm" />
                    </div>
                    <div className="py-3">
                        <NBInput label="Email" name="email" size="sm" type="email" disabled={true} />
                    </div>

                    <div className="py-3">
                        <NBInput label="Mobile Number" name="phone" size="sm" />
                    </div>
                    <div className="py-3">
                        <NBInput label="Location" name="location" size="sm" />
                    </div>
                    <div className="py-3">
                        <NBTextArea label="Description" name="description" size="sm" />
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
