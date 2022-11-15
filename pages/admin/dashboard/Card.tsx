import React, { ReactElement } from "react";
import Image from "next/image";
import IcomeIMG from "../../../images/income.svg";
import ExpenseIMG from "../../../images/expense.svg";
import ThisMonthIMG from "../../../images/thismonth.svg";

interface Props {
  image: any;
  money: string;
  desc: string;
  totalChange: string;
  up_or_down: boolean;
}

function Card({
  image,
  money,
  desc,
  totalChange,
  up_or_down,
}: Props): ReactElement {
  return (
    <div className="border flex shadow-lg rounded-3xl h-28 items-center justify-between font-body py-2 px-4">
      <div className="w-32">
        <Image src={image} />
      </div>
      <div>
        <h1 className="text-lg xl:text-2xl font-semibold text-black dark:text-white">
          {money}
        </h1>
        <p className="text-sm font-body font-semibold">{desc}</p>
        <p
          className={`text-sm ${
            up_or_down ? "text-green-500" : "text-red-500"
          } font-semibold`}
        >
          {totalChange}
        </p>
      </div>
    </div>
  );
}

export default Card;
