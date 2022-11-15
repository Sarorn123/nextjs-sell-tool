import Link from "next/link";
import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import {GiShoppingBag} from "react-icons/gi";
import {FaSellsy} from  "react-icons/fa";
import { BsInfoCircleFill } from "react-icons/bs";

type Props = {
  open: any;
};

function Sidebar({ open }: Props) {
  return (
    <div
      className={`z-40 bg-white dark:bg-gray-800 border-r dark:text-white p-4 w-[60%] transition-all duration-300 ease-in-out lg:w-[15%] h-full fixed lg:static ${
        !open && "-translate-x-full lg:fixed"
      }`}
    >
      <h1 className="text-gray-500 dark:text-gray-300 font-semibold text-sm xl:text-md">
        Menu
      </h1>

      <div className="mt-4">
        <Link href={"/admin/dashboard"}>
          <div className="text-sm md:text-md py-2  px-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700  dark:text-white mt-2  rounded-lg flex items-center">
            <MdSpaceDashboard className="mr-2 text-cyan-500" />
            <p className="text-sm">Dashboard</p>
          </div>
        </Link>

        <Link href={"/admin/user"}>
          <div className="text-sm md:text-md py-2  px-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700  dark:text-white mt-2  rounded-lg flex items-center">
            <AiOutlineUsergroupAdd className="mr-2 text-cyan-500" />
            <p className="text-sm">User</p>
          </div>
        </Link>

        <Link href={"/admin/product"}>
          <div className="text-sm md:text-md py-2  px-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700  dark:text-white mt-2  rounded-lg flex items-center">
            <GiShoppingBag className="mr-2 text-cyan-500" />
            <p className="text-sm">Product</p>
          </div>
        </Link>

        <Link href={"/admin/buy"}>
          <div className="text-sm md:text-md py-2  px-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700  dark:text-white mt-2  rounded-lg flex items-center">
            <FaSellsy className="mr-2 text-cyan-500" />
            <p className="text-sm">Buy</p>
          </div>
        </Link>

        <Link href={"/admin/support"}>
          <div className="text-sm md:text-md py-2  px-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700  dark:text-white mt-2  rounded-lg flex items-center">
            <BsInfoCircleFill className="mr-2 text-cyan-500" />
            <p className="text-sm">Support</p>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default Sidebar;
