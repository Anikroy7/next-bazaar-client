"use client"


import NBForm from "@/src/components/ui/form/NBForm";
import NBInput from "@/src/components/ui/form/NBInput";
import { useUser } from "@/src/context/user.prodvier";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { loginValidationSchema } from "@/src/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";


export default function page() {
    const { mutate: handleLoginUser, data, isPending, isSuccess } = useUserLogin()
    const router = useRouter();
    const { setIsLoading } = useUser()
    useEffect(() => {
        if (!isPending && data && isSuccess) {
            router.push('/');
            setIsLoading(true)
        }
    }, [isSuccess, data, isPending])
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        handleLoginUser(data)
    }
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold mb-6">Login</h1>
            <div className="w-[50%]">
                <NBForm onSubmit={onSubmit} resolver={zodResolver(loginValidationSchema)}>
                    <div className="py-3">
                        <NBInput label="Email" name="email" size="sm" type="email" />
                    </div>

                    <div className="py-3 relative">
                        <NBInput label="Password" name="password" size="sm" type="password" />
                    </div>
                    <div className="text-right text-sm text-blue-500 hover:underline cursor-pointer my-2">
                        <Link href="/forgot-password">Forgot Password?</Link>
                    </div>

                    <Button
                        className="my-3 w-full rounded-md bg-default-900 text-default"
                        size="lg"
                        type="submit"
                    >
                        Login
                    </Button>
                </NBForm>
            </div>

            <div className="text-center mt-4">
                New to Next Bazar?{" "}
                <Link href={"/signup"} className="text-blue-500 hover:underline">
                    Signup
                </Link>
            </div>
        </div>


    );
}
