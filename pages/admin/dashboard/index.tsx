import React from "react";
import { clientSideAuth } from "../../../utils/serversideAuthentication";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../../api_service/auth/index";
import { setAuth } from "../../../redux/slice/authSlice";
import { useRouter } from "next/router";
import Card from "./Card";
import IcomeIMG from "../../../images/income.svg";
import ExpenseIMG from "../../../images/expense.svg";
import ThisMonthIMG from "../../../images/thismonth.svg";
import Table from "./Table";
import dynamic from "next/dynamic";
const BarChart = dynamic(() => import("./BarChart"), { ssr: false });
import { motion as m } from "framer-motion";

function index() {
  const dispatch = useDispatch();
  useEffect(() => {
    clientSideAuth(dispatch);
  }, []);
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-500 dark:text-white rounded-lg h-full p-4 container mx-auto overflow-auto pb-10">
      {/* ===> Income <=== */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        exit={{ x: 1 }}
        className="grid md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        <m.div
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          exit={{ x: 0 }}
        >
          <Card
            image={IcomeIMG}
            money={"100,000"}
            desc={"Total Compare Last Month"}
            totalChange={"+3000"}
            up_or_down={true}
          />
        </m.div>

        <m.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          exit={{ y: 0 }}
        >
          <Card
            image={ExpenseIMG}
            money={"10,000,000"}
            desc={"Total Income This Month"}
            totalChange={"+3000"}
            up_or_down={true}
          />
        </m.div>

        <m.div
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          exit={{ x: 0 }}
        >
          <Card
            image={ThisMonthIMG}
            money={"1,000,000"}
            desc={"Total Income Last Month"}
            totalChange={"-3000"}
            up_or_down={false}
          />
        </m.div>
      </m.div>
      {/* ===>End Income <=== */}

      {/* ===> Total News <=== */}
      <div className="lg:flex lg:items-center mt-4 gap-4">
        <div className="lg:w-[30%] flex flex-col gap-4">
          <div className="border h-32 rounded-2xl px-4 py-2 flex flex-col justify-center shadow-lg z-20 bg-white dark:bg-gray-800">
            <p className="text-md font-semibold text-black dark:text-white">
              New Users
            </p>
            <div className="flex items-center justify-between mt-2">
              <h1 className="font-bold text-xl lg:text-2xl text-black dark:text-white">
                +60
              </h1>
              <p className="bg-green-200 px-4 py-1 rounded-lg">
                <span className="text-green-600">+300</span>
              </p>
            </div>
          </div>

          <m.div
            initial={{ y: "-9rem" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.75 }}
            exit={{ y: 0 }}
            className="border h-32 rounded-2xl px-4 py-2 flex flex-col justify-center shadow-lg"
          >
            <p className="text-md font-semibold text-black dark:text-white">
              New Product This Month
            </p>
            <div className="flex items-center justify-between mt-2">
              <h1 className="font-bold text-xl lg:text-2xl text-black dark:text-white">
                +54
              </h1>
              <p className="bg-green-200 px-4 py-1 rounded-lg">
                <span className="text-green-600">+300</span>
              </p>
            </div>
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          exit={{ opacity: 1 }}
          className="w-full bg-white dark:bg-gray-800 border h-[17rem] rounded-2xl shadow-lg py-2 px-4 mt-4 lg:mt-0"
        >
          <BarChart />
        </m.div>
      </div>
      {/* ===> End Total News <=== */}

      {/* ===> Recent Users <=== */}
      <h1 className="text-black dark:text-white text-lg font-semibold mt-4">
        Recent 10 Users
      </h1>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        exit={{ opacity: 1 }}
      >
        <Table />
      </m.div>
    </div>
  );
}

export default index;
