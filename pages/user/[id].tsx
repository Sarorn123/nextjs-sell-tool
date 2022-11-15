import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import Button from "../../components/utils/Button";
import dynamic from "next/dynamic";
import EditUserDrawer from "../../components/utils/EditUserDrawer";
import { useState } from "react";
import { wrapper } from "../../redux/store";
import { checkServerSideAuth } from "../../utils/serversideAuthentication";
import { getAuthData, setAuth } from "../../redux/slice/authSlice";
import { useAppSelector } from "../../redux/hook";
import { getSingleUser } from "../../api_service/auth/index";
const Table = dynamic(() => import("./Table"), {
  ssr: false,
});

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    checkServerSideAuth(ctx, store);
    const user = await getSingleUser(ctx.params?.id);
    store.dispatch(setAuth(user.data));
    return {
      props: {},
    };
  }
);

function index({}) {
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);

  const handleToggleEdit = () => {
    setToggleEdit((pre) => !pre);
  };
  const { user } = useAppSelector(getAuthData);

  return (
    <>
      
      {toggleEdit && <EditUserDrawer closeDrawer={handleToggleEdit} />}
      {user && (
        <>
          <div className="container mx-auto mt-4">
            <div className="flex">
              <img
                src={
                  user.image_url
                    ? user.image_url
                    : "https://www.crescenttide.com/wp-content/uploads/2019/07/no-avatar-300x300.png"
                }
                className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-lg"
              />
              <div className="ml-8">
                <h1 className="text-lg lg:text-2xl font-bold uppercase">
                  {user.full_name}
                </h1>
                <p className="text-blue-400 font-semibold text-[0.8rem]">
                  New User
                </p>

                <p className="text-blue-400 font-semibold text-[0.8rem]  mt-2 lg:mt-4">
                  Email
                </p>
                <h1 className="text-sm  text-gray-500">{user.email}</h1>

                <p className="text-blue-400 font-semibold text-[0.8rem]  mt-2 lg:mt-4">
                  Account Money
                </p>
                <p className="font-bold">
                  {user.money} <span className="text-green-500">រ</span>
                </p>

                <div className=" mt-2 lg:mt-4">
                  <Button text="Edit" action={handleToggleEdit} />
                </div>
              </div>
            </div>
            <div className=" px-2 py-1 flex items-center  border-b   mt-2  ">
              <AiOutlineUser />
              <h1 className="ml-2 font-semibold">About</h1>
            </div>
            <h1 className="mt-4  font-semibold">Information</h1>
            <div className="flex mt-4 ">
              <div>
                <h1 className="font-semibold text-sm text-gray-500 dark:text-white">Name </h1>
                <h1 className="font-semibold text-sm text-gray-500 dark:text-white mt-2">
                  Gender{" "}
                </h1>
                <h1 className="font-semibold text-sm text-gray-500 dark:text-white mt-2">
                  Email{" "}
                </h1>
                <h1 className="font-semibold text-sm text-gray-500 dark:text-white mt-2">
                  Phone{" "}
                </h1>
                <h1 className="font-semibold text-sm text-gray-500 dark:text-white mt-2">
                  Type{" "}
                </h1>
              </div>

              <div className="ml-4">
                <h1 className="font-semibold text-sm"> : {user.full_name}</h1>
                <h1 className="mt-2 font-semibold text-sm">
                  {" "}
                  : {user.gender == 1 ? "Male" : "Female"}
                </h1>
                <h1 className="mt-2 font-semibold text-sm"> : {user.email}</h1>
                <h1 className="mt-2 text-blue-500 font-semibold text-sm">
                  {" "}
                  : {user.phone_number}
                </h1>
                <h1 className="mt-2 font-semibold text-sm">
                  {" "}
                  : {user?.role?.name}
                </h1>
              </div>
            </div>
            <h1 className="mt-4  font-semibold">Charge History</h1>

            <Table />
          </div>
        </>
      )}
    </>
  );
}

export default index;
