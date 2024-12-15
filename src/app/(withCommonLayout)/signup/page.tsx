"use client";

import { Tabs, Tab } from "@nextui-org/tabs";

import UserSignupForm from "../../../components/auth/UserSingupForm";

import VendorSingupForm from "@/src/components/auth/VendorSignupForm";

export default function page() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-6">Signup Page</h1>

      <Tabs aria-label="Options">
        <Tab
          key="Register as a user"
          className="w-[50%]"
          title="Register as a user"
        >
          <UserSignupForm />
        </Tab>
        <Tab
          key="Register as a vendor"
          className="w-[50%]"
          title="Register as a vendor"
        >
          <VendorSingupForm />
        </Tab>
      </Tabs>
    </div>
  );
}
