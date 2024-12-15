"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";

import NBForm from "@/src/components/ui/form/NBForm";
import NBInput from "@/src/components/ui/form/NBInput";
import { useForgetPassword } from "@/src/hooks/auth.hook";

const ForgotPassword = () => {
  const { mutate: handleForgetPassword } = useForgetPassword();
  const onSubmit = (values: { email: string }) => {
    handleForgetPassword({ email: values.email });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center ">
      <div className="w-full max-w-md  p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
        <NBForm onSubmit={onSubmit}>
          <div>
            <NBInput
              required
              label="Email"
              name="email"
              size="sm"
              type="email"
            />
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
          <Link className="text-blue-500 hover:underline" href="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
