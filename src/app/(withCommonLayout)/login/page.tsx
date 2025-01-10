"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

import { loginValidationSchema } from "@/src/validation/auth.validation";
import { useUserLogin } from "@/src/hooks/auth.hook";
import NBInput from "@/src/components/ui/form/NBInput";
import NBForm from "@/src/components/ui/form/NBForm";
import { useUser } from "@/src/context/user.prodvier";

export default function Page() {
  const [creadiantialType, setCrediantialsType] = useState("");
  const [defaultValues, setDefaultValues] = useState({
    email: "",
    password: "",
  });

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

  useEffect(() => {
    const newDefaultValues = {
      email:
        creadiantialType === "user"
          ? "anikkumerroy7@gmail.com"
          : creadiantialType === "vendor"
            ? "shop@gmail.com"
            : creadiantialType === "admin"
              ? "admin@gmail.com"
              : "",
      password: "123456",
    };

    setDefaultValues(newDefaultValues);
  }, [creadiantialType]);

  const handleCredentials = (type: string) => {
    setCrediantialsType(type);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center py-4">
      <div className="flex justify-center items-center gap-6">
        <div className="  flex-1 ">
          <img
            src="https://i.ibb.co.com/yq6LxnG/Online-world.gif"
            alt="Login illustration"
            className="w-full max-w-md object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">Login</h1>

          <div className="flex gap-3 w-[100%] mt-6">
            <Button
              className="w-full rounded-md bg-default-900 text-default"
              onClick={() => handleCredentials("admin")}
            >
              Admin Credentials
            </Button>
            <Button
              className="w-full rounded-md bg-default-900 text-default"
              onClick={() => handleCredentials("vendor")}
            >
              Vendor Credentials
            </Button>
            <Button
              className="w-full rounded-md bg-default-900 text-default"
              onClick={() => handleCredentials("user")}
            >
              User Credentials
            </Button>
          </div>
          <div className="w-[100%]">
            <NBForm
              defaultValues={defaultValues}
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
      </div>
    </div>
  );
}
