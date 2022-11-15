import Image from "next/image";
import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import NoAvatar from "../../../images/noAvatar.png";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import {  getAdminProductState, setProduct } from '../../../redux/slice/admin/productSlice';
import { deleteProduct, getProduct } from "../../../api_service/admin/product";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import YesNoAsking from "../../../components/utils/YesNoAsking";
import { useState } from 'react';

type Props = {};

function Table({}: Props) {
  const { product } = getAdminProductState();
  const dispatch = useDispatch();

  const [openAsking, setOpenAsking] = useState(false);
  const [id, setId] = useState("");

  const asking=(yes: boolean)=> {
    if(yes){
      removeProduct();
    }
    setOpenAsking(false);
  }

  const removeProduct = async () => {
    const res = await deleteProduct(id);
    if(res?.status === 200){
      const data = await getProduct({});
      dispatch(setProduct(data));
      toast.success("Delete Success");
    }else{
      toast.error("Delete Error");
    }
  }

  return (
    <>
     {
      openAsking &&  <YesNoAsking action={asking} />
     }
      <table className="mt-4 w-full overflow-auto">
        <thead>
          <tr>
            <th className="text-start p-2 text-sm bg-primary text-white rounded-tl-lg">
              Image
            </th>
            <th className="text-start p-2 text-sm bg-primary bg-primary text-white">
              Name
            </th>
            <th className="text-start p-2 text-sm bg-primary bg-primary text-white  ">
              Price
            </th>
            <th className="text-start p-2 text-sm bg-primary bg-primary text-white ">
              Category
            </th>
            <th className="text-start p-2 text-sm bg-primary bg-primary text-white rounded-tr-lg">
              Operation
            </th>
          </tr>
        </thead>
        <tbody>
          {product?.data?.map((product: any, index:number) => (
            <tr className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-500 transition" key={index}>
              <td className="h-14 px-4 font-semibold border-b text-sm">
                <div className="w-9 h-9 rounded-lg overflow-hidden">
                  {
                    product.image_url ? <img src={product.image_url} /> : <Image src={NoAvatar} />
                  }
                </div>
              </td>
              <td className="font-body h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
                {product.name}
              </td>
              <td className="font-body h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
                {product.price}
              </td>
              <td className="font-body h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
                {
                  product.category?.name
                }
              </td>

              <td className="h-14 px-4 font-semibold border-b text-sm text-slate-500 dark:text-white">
                <div className="flex items-center">
                  <Link href={"product/detail/"+product.id}>
                    <p>
                    <AiFillEdit className="text-lg text-cyan-500 mx-2 cursor-pointer hover:scale-110 transition-all ease-in-out" />
                    </p>
                  </Link>
                  <AiFillDelete className="text-lg text-red-500 mx-2 cursor-pointer hover:scale-110 transition-all ease-in-out"
                    onClick={() => {
                      setOpenAsking(true);
                      setId(product.id);
                    }}
                  />
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
