import moment from "moment";
import Image from "next/image";
import React, { FormEvent, FormEventHandler } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import NoAvatar from "../../../images/noAvatar.png";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CgDetailsMore } from "react-icons/cg";
import Link from "next/link";
import { getUserState, setUsers } from '../../../redux/slice/admin/userSlice';
import { chargeMoney, getAllusers } from "../../../api_service/admin/user";
import { useDispatch } from 'react-redux';

type Props = {};

function Table({}: Props) {

  const dispatch = useDispatch();

  const { user } = getUserState();
  const [money, setMoney] = useState("");
  const [userId, setUserId] = useState("");

  const handleShowInput = (money: string, userId: string) => {
    setMoney(money);
    setUserId(userId);
  };

  const getUsers = async () => {
    const response = await getAllusers({});
    dispatch(setUsers(response));
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    const data ={
      user_id: userId,
      amount: money,
    }

    const response = await chargeMoney(data);
    if(response?.status === 201){
      getUsers();
      setUserId("");
      toast.success("Update Success");
    }else{
      toast.error("Update Fail !");
    }
  };

  return (
    <>
      <div className="fixed top-10 right-10">
        <ToastContainer />
      </div>
      <table className="mt-4 w-full overflow-auto">
        <thead>
          <tr>
            <th className="text-start p-2 text-sm bg-primary text-white rounded-tl-lg">
              Photo
            </th>
            <th className="text-start p-2 text-sm bg-primary bg-primary text-white">
              Fullname
            </th>
            <th className="text-start p-2 text-sm bg-primary bg-primary text-white  ">
              Phone
            </th>
            <th className="text-start p-2 text-sm bg-primary bg-primary text-white ">
              Email
            </th>
            <th className="text-start p-2 text-sm bg-primary bg-primary text-white ">
              Money
            </th>
            <th className="text-start p-2 text-sm bg-primary bg-primary text-white ">
              Status
            </th>
            <th className="text-start p-2 text-sm bg-primary bg-primary text-white rounded-tr-lg">
              Operation
            </th>
          </tr>
        </thead>
        <tbody>
          {user?.data?.map((user: any, index:number) => (
            <tr key={index}>
              <td className="h-14 px-4 font-semibold border-b text-sm">
                <div className="w-8 h-8 rounded-lg overflow-hidden ali">
                  {
                    user.image_url ? <img src={user.image_url} alt="" /> : <Image src={NoAvatar} />
                  }
                </div>
              </td>
              <td className="font-body h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
                {user.full_name}
              </td>
              <td className="font-body h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
              {
                  user.phone_number
                }
              </td>
              <td className="font-body h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
                {
                  user.email
                }
              </td>
              <td className="h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
                {userId == user.id ? (
                  <form action="" onSubmit={(e) => handleUpdate(e)}>
                    <input
                      type="text"
                      value={money}
                      onChange={(e) => setMoney(e.target.value)}
                      className="w-20 py-1 px-4 border dark:text-gray-500"
                    />
                  </form>
                ) : (
                  <p
                    onDoubleClick={() => handleShowInput(user.money, user.id)}
                    className="font-body"
                  >
                    {user.money}
                  </p>
                )}
              </td>
              <td className="h-14 px-4 border-b text-sm text-slate-500 dark:text-white">
                <p className="bg-green-500 text-white w-14 text-center rounded-lg font-body">
                  Login
                </p>
              </td>
              <td className="h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
                <div className="flex items-center">
                  <Link href={`user/detail/${user.id}`}>
                    <p>
                    <CgDetailsMore className="text-lg text-cyan-500 mx-2 cursor-pointer hover:scale-110 transition-all ease-in-out" />
                    </p>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
