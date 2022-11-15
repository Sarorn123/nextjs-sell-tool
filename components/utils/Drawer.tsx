import React from "react";
import { buyProduct } from "../../api_service/product";
import { getAuthData } from "../../redux/slice/authSlice";
import { getProductState } from "../../redux/slice/productSlice";
import Button from "./Button";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../../redux/hook";

interface Props {
  closeDrawer: any,
  product: any,
  user:any

}

const Drawer = ({closeDrawer, product, user}: Props) => {

  const handleBuyProduct = async () => {
    const response = await buyProduct(product.id, user?.id);
    if(response?.status === 201){
      toast.success("Buy Success")
    }else{
      toast.error(response?.message)
    }
  }

  return (
    <>
      
      <div className="bg-black opacity-50 fixed h-screen w-full top-0 left-0 z-10 overflow-hidden" onClick={closeDrawer}></div>
      <div className="text-white overflow-auto  z-40 fixed  rounded-lg p-4 border top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-[90%] lg:w-[50%]  h-[50vh] lg:h-[70vh] bg-gradient-to-t from-slate-300 to-cyan-500">
        <h1 className="font-semibold text-xl">
          Your Money : <span className="">{user.money} R</span>
        </h1>

        <div className="mt-4 flex items-center">
          <img
            src={product.image_url}
            className="w-32 rounded-lg"
          />
          <div className="ml-4">
            <h1>{product.name}</h1>
            <h1 className="mt-2">{product.price} R</h1>
            
            <div className="mt-4">
              <Button text="Buy" action={handleBuyProduct} />
            </div>
          </div>
        </div>

        <p className="mt-4">{product.description_kh}</p>
        <p className="mt-4">{product.description_en}</p>
      </div>
    </>
  );
};

export default Drawer;
