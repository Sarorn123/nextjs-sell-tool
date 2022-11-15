import React from "react";
import { MdDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";
import { RiComputerFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  open: boolean;
  setOpen: any;
};

const Filter = ({ open, setOpen }: Props) => {
  return (
    <div
      className={`z-40 transition-all duration-300 ease-in-out h-screen fixed top-0 right-0 w-[80%] md:w-[60%] xl:w-[20%] border-l shadow-lg p-4 ${
        !open && "translate-x-full"
      } bg-white dark:bg-slate-800`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-gray-500 dark:text-gray-300 font-semibold text-sm xl:text-md">
          Filter
        </h1>
        <AiOutlineClose
          className="font-bold text-red-500 text-lg hover:scale-125 cursor-pointer transition-all"
          onClick={() => setOpen((pre: any) => !pre)}
        />
      </div>

      <div className="mt-4">
        <select className="placeholder:text-white border bg-transparent mt-2  px-4 py-2 rounded-lg w-full transition-all text-gray-500 outline-none dark:text-white dark:bg-gray-800">
          <option value="login">Login</option>
          <option value="Notlogin">Not Login</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
