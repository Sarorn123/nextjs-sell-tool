import moment from "moment";
import Image from "next/image";
import React, { FormEvent, FormEventHandler } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import NoAvatar from "../../../images/noAvatar.png";
import "react-toastify/dist/ReactToastify.css";
import { CgDetailsMore } from "react-icons/cg";
import { getBuyData } from "../../../redux/slice/admin/buySlice";

type Props = {};

function Table({}: Props) {
  const { buy } = getBuyData();

  return (
    <>
      <table className="mt-4 w-full overflow-auto">
        <thead>
          <tr>
            <th className="text-start p-2 text-sm bg-primary text-white rounded-tl-lg">
              Image
            </th>
            <th className="text-start p-2 text-sm bg-primary bg-primary text-white">
              Product
            </th>
            <th className="text-start p-2 text-sm bg-primary bg-primary text-white  ">
              Customer
            </th>
            <th className="text-start p-2 text-sm bg-primary bg-primary text-white  ">
              Email
            </th>
            <th className="text-start p-2 text-sm bg-primary bg-primary text-white ">
              Amount
            </th>
            <th className="text-start p-2 text-sm bg-primary bg-primary text-white ">
              Date
            </th>
            <th className="text-start p-2 text-sm bg-primary bg-primary text-white rounded-tr-lg">
              Operation
            </th>
          </tr>
        </thead>
        <tbody>
          {buy?.data?.map((singleBuy: any) => (
            <tr className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-500 transition" key={singleBuy.id}>
              <td className="h-14 px-4 font-semibold border-b text-sm">
                <div className="w-8 h-8 rounded-lg overflow-hidden ali">
                  {
                    singleBuy.product_image ? <img src={singleBuy.product_image} /> : <Image src={NoAvatar} />
                  }
                </div>
              </td>
              <td className="font-body h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
                {singleBuy.product_name}
              </td>
              <td className="font-body h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
                {
                  singleBuy.full_name
                }
              </td>
              <td className="font-body h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
                {
                  singleBuy.email
                }
              </td>
              <td className="font-body h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
                {singleBuy.amount}
              </td>
              <td className="font-body h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
                {
                  moment(singleBuy.date).format("dddd-MMM-yyyy")
                }
              </td>

              <td className="h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
                <div className="flex items-center">
                  <AiFillDelete className="text-lg text-red-500 mx-2 cursor-pointer hover:scale-110 transition-all ease-in-out" />
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
