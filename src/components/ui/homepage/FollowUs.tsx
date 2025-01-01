"use client";
import { Avatar } from "@nextui-org/avatar";
import Image from "next/image";
import React from "react";

export default function FollowUs() {
  return (
    <section className="py-10 ">
      <div className="container mx-auto px-6 py-8 flex justify-between items-center  border-t  border-b">
        <div className="flex items-center">
          <Avatar
            size="lg"
            src="https://pbs.twimg.com/profile_images/1565710214019444737/if82cpbS_400x400.jpg"
          />
          <p className=" ml-4">Easy and trusted online shop in Dhaka</p>
        </div>

        <div className="flex items-center gap-3">
          <p className="font-semibold">Follow us on: </p>
          <div className="flex space-x-4">
            <a
              className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
              href="https://www.facebook.com/anik.roy.56100"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt="facebook"
                className="h-8 w-8"
                height={100}
                src={"https://cdn-icons-png.flaticon.com/128/5968/5968764.png"}
                width={100}
              />
            </a>
            <a
              className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
              href="https://www.linkedin.com/in/anik-roy-a14185241"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt="linkedin"
                className="h-8 w-8"
                height={100}
                src={"https://cdn-icons-png.flaticon.com/128/145/145807.png"}
                width={100}
              />
            </a>
            <a
              className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
              href="www.twitter.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt="twitter "
                className="h-8 w-8"
                height={100}
                src={"https://cdn-icons-png.flaticon.com/128/3670/3670151.png"}
                width={100}
              />
            </a>
            <a
              className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
              href="www.google.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt="google"
                className="h-8 w-8"
                height={100}
                src={"https://cdn-icons-png.flaticon.com/128/2111/2111450.png"}
                width={100}
              />
            </a>
            <a
              className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
              href="www.instagram.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt="intragran"
                className="h-8 w-8"
                height={100}
                src={"https://cdn-icons-png.flaticon.com/128/3955/3955024.png"}
                width={100}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
