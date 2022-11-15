import React from "react";
import { MdDarkMode } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from 'react';
import Button from "../../../components/utils/Button";
import DatePickers from "./DatePicker";
import moment from 'moment';
import AutoCompleteInput from "./AutoCompleteUser";
import AutoCompleteUser from "./AutoCompleteUser";
import AutoCompleteProduct from "./AutoCompleteProduct";

type Props = {
  open: boolean;
  setOpen: any;
  handleFilterBuy: any
};

const Filter = ({ open, setOpen, handleFilterBuy }: Props) => {

  const [userId, setUserId] = useState("");
  const [productId, setProductId] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    const NewStartDate = startDate ? moment(new Date(startDate)).format("YYYY-MM-DD") : "";
    const NewEndDate = endDate ? moment(new Date(endDate)).format("YYYY-MM-DD") : "";
    handleFilterBuy(userId, productId, NewStartDate, NewEndDate);
  }

  const handleClearFilter = () => {
    setUserId("");
    setProductId("");
    setStartDate("");
    setEndDate("");
    handleFilterBuy(userId, productId, "", "");
  }

  return (
    <div
      className={`overflow-auto z-40 transition-all duration-300 ease-in-out h-screen fixed top-0 right-0 w-[80%] md:w-[60%] xl:w-[20%] border-l shadow-lg p-4 ${
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

        <div className="mt-4">
          <AutoCompleteUser setValue={setUserId} placeholder="Select User" />
        </div>

        <div className="mt-2">
          <AutoCompleteProduct setValue={setProductId} placeholder="Select Product" />
        </div>

        <div className="mt-2 w-full">
          <DatePickers setDate={setStartDate} />
        </div>

        <div className="mt-2 w-full">
          <DatePickers setDate={setEndDate} />
        </div>

        <div className="mt-2">
          <div className="flex items-center">
              <div className="mr-2">
                <Button text="Filter" action={handleFilter} />
              </div>
              <Button text="Clear" action={handleClearFilter} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Filter;
