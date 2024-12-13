"use client"

import NBForm from "@/src/components/ui/form/NBForm";
import NBInput from "@/src/components/ui/form/NBInput";
import { useForgetPassword } from "@/src/hooks/auth.hook";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
    const router = useRouter()
    const { mutate: handleForgetPassword, data, isPending, isSuccess } = useForgetPassword()
    const onSubmit = (values: { email: string }) => {
        handleForgetPassword({ email: values.email })
    };

    console.log(data, isPending, isSuccess)

    return (
        <div className="flex min-h-screen w-full items-center justify-center ">
            <div className="w-full max-w-md  p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
                <NBForm
                    onSubmit={onSubmit}
                >
                    <div>
                        <NBInput label="Email" name="email" size="sm" type="email" required />
                    </div>
                    <Button
                        className="my-3 w-full rounded-md bg-default-900 text-default"
                        size="lg"
                        type="submit"
                    >
                        Send reset link
                    </Button>
                </NBForm>
                <div className="text-center mt-4 text-sm">
                    Remember your password?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
