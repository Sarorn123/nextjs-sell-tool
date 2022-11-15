import React from "react";
import { motion as m } from "framer-motion";

interface Props {
  action: any;
}

const YesNoAsking = ({ action }: Props) => {
  return (
    <>
      <div className="bg-black opacity-70 w-full h-screen fixed left-0 top-0 z-[1000]"
        onClick={() => action(false)}
      ></div>
      <m.div
        className="w-80 h-60 rounded-lg  bg-white px-4 py-2 dark:bg-gray-800 z-[10000] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        exit={{ opacity: 1 }}
      >
        <h1 className="text-2xl font-semibold mt-4 dark:text-white">Are You Sure ?</h1>
        <div className="flex justify-end  mt-[8rem]">
          <button className="bg-red-500 rounded-lg px-4 py-2 text-white mr-4 active:bg-red-600" onClick={() => action(false)}>
            Cancel
          </button>
          <button className="bg-cyan-500 rounded-lg px-4 py-2 text-white active:bg-cyan-600" onClick={() => action(true)}>
            Yes
          </button>
        </div>
      </m.div>
    </>
  );
};

export default YesNoAsking;
