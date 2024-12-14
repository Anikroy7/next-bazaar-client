"use client";
import { FaHome, FaTachometerAlt } from "react-icons/fa";
import dynamic from "next/dynamic";

const DynamicLoading = dynamic(() => import('@/src/components/ui/shared/Loading'), {
    ssr: false,
})
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useUser } from "@/src/context/user.prodvier";
import { adminMenuItems, vendorMenuItems } from "@/src/config/sidebarItems";


const Sidebar = () => {
    const { user, isLoading } = useUser();

    return (
        <div className="flex flex-col w-64 h-screen shadow-lg">
            {isLoading && <DynamicLoading />}
            <div className="flex items-center justify-center h-16 ">
                <Link href={"/"} className="flex items-center justify-center h-16 ">
                    <Image
                        src={'https://pbs.twimg.com/profile_images/1565710214019444737/if82cpbS_400x400.jpg'}
                        width={50}
                        height={50}
                        alt={"NEXT BAZAR"}
                    />
                    <p className="font-bold text-inherit">BAZAR</p>
                </Link>
            </div>
            <nav className="flex-1 mt-4">
                <ul className="space-y-2">
                  {/*   <li>
                        <Link
                            className={`flex items-center px-4 py-2 hover:bg-gray-700  transition-colors`}
                            href="/dashboard"
                        >
                            <FaTachometerAlt className="h-5 w-5" />
                            <span className="ml-2">Dashboard</span>
                        </Link>
                    </li> */}
                    {user?.role === "ADMIN"
                        ? adminMenuItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    className="flex items-center px-4 py-2 hover:bg-gray-700 ${paths.length===2&&'bg-slate-700'} transition-colors"
                                    href={`/dashboard/admin/${item.path}`}
                                >
                                    {item.icon}
                                    <span className="ml-2">{item.label}</span>
                                </Link>
                            </li>
                        ))
                        : vendorMenuItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    className={` flex items-center px-4 py-2 hover:bg-gray-700 transition-colors`}
                                    href={`/dashboard/vendor/${item.path}`}
                                >
                                    {item.icon}
                                    <span className="ml-2">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-700">
                <Link
                    className="flex items-center px-4 py-2 text-gray-00 hover:bg-gray-700 hover:text-white transition-colors"
                    href="/"
                >
                    <FaHome className="h-5 w-5" />
                    <span className="ml-2">Back to home</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
