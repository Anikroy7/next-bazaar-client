"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chip } from "@nextui-org/chip";
import { Avatar } from "@nextui-org/avatar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import NBInput from "../ui/form/NBInput";
import NBForm from "../ui/form/NBForm";

import { signupValidationSchema } from "@/src/validation/auth.validation";
import { useUserRegistration } from "@/src/hooks/user.hook";

export default function UserRegisterPage() {
  const {
    mutate: userSignupHandler,
    isSuccess,
    data,
    isPending,
  } = useUserRegistration();
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };

    userSignupHandler(userData);
  };

  useEffect(() => {
    if (!isPending && data && isSuccess) {
      router.push("/login");
    }
  }, [isSuccess, data, isPending]);

  return (
    <div className="w-[100%]">
     {/*  <div className="text-center">
        <Chip
          avatar={<Avatar getInitials={() => "U"} name="JW" size="sm" />}
          variant="dot"
        >
          Become a user
        </Chip>
      </div> */}
      <NBForm
        resolver={zodResolver(signupValidationSchema)}
        onSubmit={onSubmit}
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
          <NBInput label="Address" name="address" size="sm" />
        </div>
        <div className="py-3">
          <NBInput label="Password" name="password" size="sm" type="password" />
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
