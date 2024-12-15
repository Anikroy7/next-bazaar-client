"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import NBForm from "../ui/form/NBForm";
import NBInput from "../ui/form/NBInput";
import { zodResolver } from '@hookform/resolvers/zod';
import { Chip } from "@nextui-org/chip";
import { Avatar } from "@nextui-org/avatar";
import { vendorSignupValidationSchema } from "@/src/validation/auth.validation";
import NBTextArea from "../ui/form/NBTextArea";
import { useCreateVendor } from "@/src/hooks/user.hook";
import { useEffect } from "react";
import { useRouter } from "next/navigation";



export default function VendorRegisterPage() {

    const { mutate: handleCreateVendor, isPending, isSuccess, data } = useCreateVendor();
    const router = useRouter()
    useEffect(() => {
        if (!isPending && data && isSuccess) {
            router.push('/login')
        }
    }, [isSuccess, data, isPending])
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const vendorData = {
            ...data,
            logo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        };
        handleCreateVendor(vendorData)
    };


    return (
        <div className="w-[100%]">
            <div className="text-center">
                <Chip
                    avatar={<Avatar getInitials={() => 'V'} name="JW" size="sm" />}
                    variant="dot"
                >
                    Become a vendor
                </Chip>
            </div>
            <NBForm
                onSubmit={onSubmit}
                resolver={zodResolver(vendorSignupValidationSchema)}
            >
                <div className="py-3">
                    <NBInput label="Name" name="name" size="sm" />
                </div>
                <div className="py-3">
                    <NBInput label="Email" name="email" size="sm" type="email" />
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
                <div className="py-3">
                    <NBInput
                        label="Password"
                        name="password"
                        size="sm"
                        type="password"
                    />
                </div>

                <Button
                    className="my-3 w-full rounded-md bg-default-900 text-default"
                    size="lg"
                    type="submit"
                >
                    Signup
                </Button>
            </NBForm>
            <div className="text-center">
                Already have an account ? <Link href={"/login"}>Login</Link>
            </div>
        </div>
    );
}
