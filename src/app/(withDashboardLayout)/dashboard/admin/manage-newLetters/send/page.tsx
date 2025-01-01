"use client";

import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "sonner";

import { useSendNewsLetter } from "@/src/hooks/newLettter.hook";

function SendEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { mutate: sendLetter, data, isPending } = useSendNewsLetter();
  const [message, setMessage] = useState("");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!isPending && data) {
      router.push("/dashboard/admin/manage-newLetters");
      toast.success(data?.message);
    }
  }, [data, isPending]);

  const handleSendLetter = () => {
    if (email && message) {
      sendLetter({
        email: email,
        letterData: { message },
      });
    } else {
      toast.error("Invalid Data");
    }
  };

  return (
    <div>
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold mb-6">Add Category</h1>
        <h1 className=" font-semibold mb-6">Send to: {email}</h1>
        <div className="w-[50%]">
          <div className="py-3">
            <Textarea
              className=""
              label="Description"
              placeholder="Enter your description"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <Button
            className="my-3 w-full rounded-md bg-default-900 text-default"
            size="lg"
            onClick={() => handleSendLetter()}
          >
            Send
            <FaPaperPlane size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SendEmailPage />
    </Suspense>
  );
};

export default Page;
