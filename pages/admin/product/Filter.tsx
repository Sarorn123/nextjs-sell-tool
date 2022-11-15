import React from "react";
import { MdDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";
import { RiComputerFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getCategory } from "../../../api_service/admin/product";
import { useDispatch } from "react-redux";
import { getAdminProductState } from "../../../redux/slice/admin/productSlice";
import Button from "../../../components/utils/Button";

type Props = {
  open: boolean;
  setOpen: any;
  setCategoryId: any;
};

const Filter = ({ open, setOpen, setCategoryId }: Props) => {
  const [categoryID, setCategoryID] = useState("");

  useEffect(() => {
    setCategoryId(categoryID);
  }, [categoryID]);

  const { category } = getAdminProductState();
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
        <select
          className="placeholder:text-white border bg-transparent mt-2  px-4 py-2 rounded-lg w-full transition-all text-gray-500 outline-none dark:text-white dark:bg-gray-800"
          value={categoryID}
          onChange={(e) => setCategoryID(e.target.value)}
        >
          <option value="" defaultChecked>No</option>
          {category.map((result: any) => (
            <option value={result.id} key={result.id}>
              {result.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
