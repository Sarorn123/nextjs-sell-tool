import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Button from "../../../../components/utils/Button";
import { useDispatch } from "react-redux";
import { clientSideAuth } from "../../../../utils/serversideAuthentication";
const Table = dynamic(() => import("./Table"), {
  ssr: false,
});
import { motion as m } from "framer-motion";
import { useRouter } from "next/router";
import { getSingleUser } from "../../../../api_service/admin/user/index";
import {
  getUserState,
  setSingleUser,
} from "../../../../redux/slice/admin/userSlice";
import NoAvatar from "../../../../images/noAvatar.png";
import Image from "next/image";

function Index({}) {
  const dispatch = useDispatch();

  const router = useRouter();

  const getUserDetail = async () => {
    const id = router.query.id;
    if (!id) {
      return router.push("/admin/user");
    }
    const response = await getSingleUser(id);
    dispatch(setSingleUser(response.data));
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  useEffect(() => {
    clientSideAuth(dispatch);
  }, []);

  const { singleUser } = getUserState();
  return (
    <m.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.55,
      }}
      exit={{
        opacity: 1,
      }}
    >
      <div className="bg-white dark:bg-gray-800 p-4 h-[90vh] overflow-auto rounded-lg pb-10 container mx-auto text-gray-500 dark:text-white">
        {singleUser && (
          <>
            <div className="">
              <div className="flex">
                {singleUser.image_url ? (
                  <img
                    src={singleUser.image_url}
                    className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-lg overflow-hidden">
                    <Image src={NoAvatar} />
                  </div>
                )}
                <div className="ml-8">
                  <h1 className="text-lg lg:text-2xl font-bold uppercase">
                    {singleUser.full_name}
                  </h1>
                  <p className="text-blue-400 font-semibold text-[0.8rem]">
                    New User
                  </p>

                  <p className="text-blue-400 font-semibold text-[0.8rem]  mt-2 lg:mt-4">
                    Email
                  </p>
                  <h1 className="text-sm  text-gray-500 dark:text-white">
                    {singleUser.email}
                  </h1>

                  <p className="text-blue-400 font-semibold text-[0.8rem]  mt-2 lg:mt-4">
                    Account Money
                  </p>
                  <p className="font-bold">
                    {singleUser.money} <span className="text-green-500">រ</span>
                  </p>
                </div>
              </div>
              <div className=" px-2 py-1 flex items-center  border-b   mt-2  ">
                <AiOutlineUser />
                <h1 className="ml-2 font-semibold">About</h1>
              </div>
              <h1 className="mt-4  font-semibold">Information</h1>
              <div className="flex mt-4 ">
                <div>
                  <h1 className="font-semibold text-sm text-gray-500 dark:text-white">
                    Name{" "}
                  </h1>
                  <h1 className="font-semibold text-sm text-gray-500 mt-2 dark:text-white">
                    Gender{" "}
                  </h1>
                  <h1 className="font-semibold text-sm text-gray-500 mt-2 dark:text-white">
                    Email{" "}
                  </h1>
                  <h1 className="font-semibold text-sm text-gray-500 mt-2 dark:text-white">
                    Phone{" "}
                  </h1>
                  <h1 className="font-semibold text-sm text-gray-500 mt-2 dark:text-white">
                    Type{" "}
                  </h1>
                </div>

                <div className="ml-4">
                  <h1 className="font-semibold text-sm">
                    {" "}
                    : {singleUser.full_name}
                  </h1>
                  <h1 className="mt-2 font-semibold text-sm">
                    {" "}
                    : {singleUser.gender == 1 ? "Male" : "Female"}
                  </h1>
                  <h1 className="mt-2 font-semibold text-sm">
                    {" "}
                    : {singleUser.email}
                  </h1>
                  <h1 className="mt-2 text-blue-500 font-semibold text-sm">
                    {" "}
                    : {singleUser.phone_number}
                  </h1>
                  <h1 className="mt-2 font-semibold text-sm">
                    {" "}
                    : {singleUser.role.name}
                  </h1>
                </div>
              </div>

              {singleUser?.chargHistory?.length === 0 ? (
                <h1 className="mt-4  font-semibold text-center">
                  No Charge History
                </h1>
              ) : (
                <div>
                  <h1 className="mt-4  font-semibold">Charge History</h1>
                  <Table />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </m.div>
  );
}

export default Index;
