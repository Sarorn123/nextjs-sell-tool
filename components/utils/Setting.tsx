import React from "react";
import { changeTheme } from "./ThemeControll";
import { MdDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";
import { RiComputerFill } from "react-icons/ri";
import { useEffect, useState } from 'react';

type Props = {
  open: boolean;
};

const Setting = ({ open }: Props) => {

  const [theme, setTheme] = useState("");
  useEffect(() => {
    const orgTheme = localStorage.getItem("theme");
    setTheme(orgTheme ? orgTheme : "");
  },[])

  return (
    <div
      className={`z-[10000] transition-all duration-300 ease-in-out h-screen fixed top-0 right-0 w-[80%] md:w-[60%] xl:w-[20%] border-l shadow-lg p-4 ${
        !open && "translate-x-full"
      } bg-white dark:bg-slate-800`}
    >
      <div>
        <h1 className="text-gray-500 dark:text-gray-300 font-semibold text-sm xl:text-md">
          Theme Setting
        </h1>

        <div className="mt-4">
          <div
            className={`py-2 px-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700  dark:text-white mt-2  rounded-lg flex items-center ${theme === "light" && "bg-gray-200"} `}
            onClick={() => {
              changeTheme("light");
              setTheme("light");
            }}
          >
            <BsFillSunFill className="mr-2" />
            <p className="text-sm">Light</p>
          </div>

          <div
            className={`py-2 px-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700  dark:text-white mt-2  rounded-lg flex items-center ${theme === "dark" && "bg-gray-700"} `}
            onClick={() => {
              changeTheme("dark");
              setTheme("dark");
            }}
          >
            <MdDarkMode className="mr-2" />
            <p className="text-sm">Dark</p>
          </div>

          <div
            className={`py-2 px-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700  dark:text-white mt-2  rounded-lg flex items-center ${!theme && "bg-gray-200"} `}
            onClick={() => {
              changeTheme("OS");
              setTheme("");
            }}
          >
            <RiComputerFill className="mr-2" />
            <p className="text-sm">System</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
