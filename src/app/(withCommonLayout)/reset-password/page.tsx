"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

import NBForm from "@/src/components/ui/form/NBForm";
import NBInput from "@/src/components/ui/form/NBInput";
import { useResetPassword } from "@/src/hooks/auth.hook";
import { resetPasswordValidationSchema } from "@/src/validation/auth.validation";

// Create a separate component that can be wrapped in Suspense
const ResetPasswordForm = () => {
  const router = useRouter();
  const {
    mutate: handleResetPassword,
    data,
    isSuccess,
    isPending,
  } = useResetPassword();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!isPending && data && isSuccess) {
      router.push("/login");
    }
  }, [isSuccess, data, isPending]);

  const onSubmit = (values: { password: string; confirmPassword: string }) => {
    handleResetPassword({
      email,
      token,
      newPassword: values.password,
    });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
        <NBForm
          resolver={zodResolver(resetPasswordValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="my-5">
            <NBInput
              label="New Password"
              name="password"
              size="sm"
              type="password"
            />
          </div>
          <div>
            <NBInput
              label="Confirm Password"
              name="confirmPassword"
              size="sm"
              type="password"
            />
          </div>
          <Button
            className="my-3 w-full rounded-md bg-default-900 text-default"
            size="lg"
            type="submit"
          >
            Reset Password
          </Button>
        </NBForm>
      </div>
    </div>
  );
};

const ResetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPassword;
