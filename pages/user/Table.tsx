import moment from "moment";
import React from "react";
import { useAppSelector } from "../../redux/hook";
import { getAuthData } from "../../redux/slice/authSlice";

type Props = {};

function Table({}: Props) {
  const { user } = useAppSelector(getAuthData);

  return user && user?.chargHistory?.length !== 0 ? (
    <table className="mt-4 w-full">
      <thead>
        <tr>
          <th className="text-start p-2  rounded-tl-lg bg-primary text-white">
            No
          </th>
          <th className="text-start p-2 border bg-primary text-white">
            Amount
          </th>
          <th className="text-start p-2 border bg-primary bg-primary text-white">
            Date
          </th>
          <th className="text-start p-2 bg-primary bg-primary text-white rounded-tr-lg">
            Curency
          </th>
        </tr>
      </thead>
      {user &&
        user?.chargHistory?.map((charg: any, index: number) => (
          <tbody key={index}>
            <tr>
              <td className="p-2 font-semibold border text-sm">{index + 1}</td>
              <td className="p-2 font-semibold border text-sm">
                {charg.amount}
              </td>
              <td className="p-2 font-semibold border text-sm">
                {moment(charg.date).format("dddd-MMM-YYYY")}
              </td>
              <td className="p-2 font-semibold border text-sm">
                {charg.currency}
              </td>
            </tr>
          </tbody>
        ))}
    </table>
  ) : (
    <p className="text-center text-lg font-semibold">No History</p>
  );
}

export default Table;
