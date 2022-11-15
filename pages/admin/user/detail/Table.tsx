import moment from "moment";
import React from "react";
import { getUserState } from "../../../../redux/slice/admin/userSlice";

type Props = {};

function Table({}: Props) {
  const user = null;
  const { singleUser } = getUserState();

  return (
    <table className="mt-4 w-full">
      <tr>
        <th className="text-start p-2  rounded-tl-lg bg-primary text-white">
          No
        </th>
        <th className="text-start p-2 bg-primary text-white">Amount</th>
        <th className="text-start p-2 bg-primary bg-primary text-white">
          Date
        </th>
        <th className="text-start p-2 bg-primary bg-primary text-white rounded-tr-lg">
          Curency
        </th>
      </tr>
      <tbody>
        {singleUser?.chargHistory?.map((charge: any, index: number) => (
          <tr key={index}>
            <td className="p-2 font-semibold border text-sm">{index + 1}</td>
            <td className="p-2 font-semibold border text-sm">
              {charge.amount}
            </td>
            <td className="p-2 font-semibold border text-sm">
              {moment(charge.date).format("dddd-MMM-YYYY")}
            </td>
            <td className="p-2 font-semibold border text-sm">
              {charge.currency}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
