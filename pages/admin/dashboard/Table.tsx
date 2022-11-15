import moment from "moment";
import Image from "next/image";
import React, { FormEvent, FormEventHandler } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import NoAvatar from "../../../images/noAvatar.png";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CgDetailsMore } from "react-icons/cg";
import Link from "next/link";

type Props = {};

function Table({}: Props) {
  const data = [
    {
      id: 1,
      full_name: "Jack",
      money: "2000",
    },
    {
      id: 2,
      full_name: "Jack",
      money: "1000",
    },
    {
      id: 2,
      full_name: "Jack",
      money: "1000",
    },
  ];

  return (
    <>
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
          {data.map((user: any, index: number) => (
            <tr key={index}>
              <td className="h-14 px-4 font-semibold border-b text-sm">
                <div className="w-8 h-8 rounded-lg overflow-hidden ali">
                  <Image src={NoAvatar} />
                </div>
              </td>
              <td className="font-body h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
                {user.full_name}
              </td>
              <td className="font-body h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
                0929323323
              </td>
              <td className="font-body h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
                jonh@gmail.com
              </td>
              <td className="h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
                <p className="font-body">{user.money}</p>
              </td>
              <td className="h-14 px-4 border-b text-sm text-slate-500 dark:text-white">
                <p className="bg-green-500 text-white w-14 text-center rounded-lg font-body">
                  Login
                </p>
              </td>
              <td className="h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
                <div className="flex items-center">
                  <Link href="user/detail/1">
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
