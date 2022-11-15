import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import Button from "./Button";

type props  = {
  product: any
}

const Card = ({product}: props) => {
  const router = useRouter();
  return (
    <div className="rounded-lg overflow-hidden w-full  h-[18rem] border shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
     <div className="h-[50%]">
      <img
          src={product.image_url}
          className="w-full h-[100%] object-cover"
        />
     </div>
      <div className="mx-4">
        <h1 className=" text-sm lg:text-lg font-semibold mt-2 capitalize truncate">
          {product.name}
        </h1>
        <p className="font-semibold">{product.price} រ</p>
        <p className="text-slate-500 text-sm list-inside truncate dark:text-slate-400">{product.description_kh}</p>
        <div className="flex items-center mt-2">
        <Button text="Detail" action={() => router.push("/detail/"+product.id)} />
          <AiOutlineHeart className="text-pink-500 text-2xl ml-4" />
        </div>
      </div>
    </div>
  );
};

export default Card;
