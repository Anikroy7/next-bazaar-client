"use client";

import dynamic from "next/dynamic";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { useRouter } from "next/navigation";

import { useGetLoogedUserInfo } from "@/src/hooks/user.hook";

const DynamicLoading = dynamic(
  () => import("@/src/components/ui/shared/Loading"),
  {
    ssr: false,
  },
);

const UserProfile = () => {
  const router = useRouter();
  const { data, isLoading } = useGetLoogedUserInfo();

  if (isLoading) return <DynamicLoading />;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="max-w-md w-full shadow-lg">
        <CardBody className="p-6">
          <div className="flex items-center justify-center">
            <Avatar
              alt={data?.data?.name}
              className="w-24 h-24"
              src={data?.data?.profileImage}
            />
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">{data?.data?.name}</h2>
            <p className="text-sm text-gray-500">{data?.data?.email}</p>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Phone:</span>
              <span>{data?.data?.phone}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Address:</span>
              <span>{data?.data?.address}</span>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Button
              className="my-3 w-full rounded-md bg-default-900 text-default"
              onClick={() => router.push("/profile/edit")}
            >
              Edit Profile
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserProfile;
