"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

import { loginValidationSchema } from "@/src/validation/auth.validation";
import { useUserLogin } from "@/src/hooks/auth.hook";
import NBInput from "@/src/components/ui/form/NBInput";
import NBForm from "@/src/components/ui/form/NBForm";
import { useUser } from "@/src/context/user.prodvier";

export default function Page() {
  // Renamed from `page` to `Page`
  const router = useRouter();
  const {
    mutate: handleLoginUser,
    data,
    isPending,
    isSuccess,
  } = useUserLogin();
  const { setIsLoading } = useUser();

  useEffect(() => {
    if (!isPending && data && isSuccess) {
      router.push("/");
      setIsLoading(true);
    }
  }, [isSuccess, data, isPending]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleLoginUser(data);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-6">Login</h1>
      <div className="w-[50%]">
        <NBForm
          resolver={zodResolver(loginValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="py-3">
            <NBInput label="Email" name="email" size="sm" type="email" />
          </div>

          <div className="py-3 relative">
            <NBInput
              label="Password"
              name="password"
              size="sm"
              type="password"
            />
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
        <Link className="text-blue-500 hover:underline" href={"/signup"}>
          Signup
        </Link>
      </div>
    </div>
  );
}
