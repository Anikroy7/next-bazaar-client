"use client";

import { Tabs, Tab } from "@nextui-org/tabs";
import Image from "next/image";

import UserSignupForm from "../../../components/auth/UserSingupForm";

import VendorSingupForm from "@/src/components/auth/VendorSignupForm";

export default function page() {
  return (
    <div className="flex w-full flex-col items-center justify-center py-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Create a account
      </h1>

      <div className="flex w-full max-w-6xl gap-8 items-center justify-center">
        <div className="flex-1">
          <Image
            alt="Signup Animation"
            className="w-full h-auto max-w-md mx-auto rounded-lg shadow-lg"
            height={400}
            src="https://i.ibb.co/khzytjR/Sign-up.gif"
            width={600}
          />
        </div>
        {/* Tabs Section */}
        <div className="flex-1">
          <Tabs aria-label="Options" className="w-full">
            <Tab
              key="Join as a user"
              className="w-[100%] text-center"
              title="Join as a user"
            >
              <UserSignupForm />
            </Tab>
            <Tab
              key="Join as a vendor"
              className="w-[100%] text-center"
              title="Join as a vendor"
            >
              <VendorSingupForm />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
