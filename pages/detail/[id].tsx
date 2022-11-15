import React from "react";
import Button from "../../components/utils/Button";
import Card from "../../components/utils/Card";
import Drawer from "../../components/utils/Drawer";
import { useState } from "react";
import { wrapper } from "../../redux/store";
import { getSingleProduct } from "../../api_service/product/index";
import {
  setSingleProduct,
  getProductState,
} from "../../redux/slice/productSlice";
import { useAppSelector } from "../../redux/hook";
import { checkServerSideAuth } from "../../utils/serversideAuthentication";
import {motion as m} from "framer-motion"
import { getAuthData } from "../../redux/slice/authSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    checkServerSideAuth(ctx, store);
    const id: number = Number(ctx.params?.id);
    const res = await getSingleProduct(id);
    const data = {
      product: res,
      actionType: "getSingle",
    };
    store.dispatch(setSingleProduct(data));
    return {
      props: {},
    };
  }
);

type Props = {};

function Detail({}: Props) {
  const [openBuyDrawer, setOpenBuyDrawer] = useState(false);

  const { user } = useAppSelector(getAuthData);
  const { singleProduct } = useAppSelector(getProductState);

  const handleOpenDrawer = () => {

    if(!user){
      toast.warning("Please Login First ! 👨");
      return;
    }

    setOpenBuyDrawer(!openBuyDrawer);
  };
  
  
  return (
    <m.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.75,
      }}
      exit={{
        opacity: 1,
      }}
    >
      <ToastContainer />
      {openBuyDrawer && <Drawer closeDrawer={handleOpenDrawer} product={singleProduct} user={user} />}
      {singleProduct && (
        <div className="container mx-auto mt-4 lg:flex justify-between">
          <div className="flex-1">
            <div className="md:flex">
              <img
                src={singleProduct.image_url}
                className="w-full md:w-52 md:h-60 lg:w-60 object-cover rounded-lg"
              />
              <div className="ml-0 md:ml-4 lg:ml-8">
                <h1 className="mt-2 text-2xl font-semibold capitalize">
                  {singleProduct.name}
                </h1>
                <h1 className="mt-2 text-slate-500 dark:text-white">
                  តម្លៃ : {singleProduct.price}​ រ
                </h1>
                <h1 className="mt-2 text-slate-500 dark:text-white">
                  ប្រភេទ : {singleProduct.category.name}
                </h1>
                <div className="mt-4">
                  <Button text="Buy" action={handleOpenDrawer} />
                </div>
              </div>
            </div>

            <p className="mt-4 text-slate-500 dark:text-white">
              {singleProduct.description_kh}
            </p>

            <p className="mt-4 text-slate-500 dark:text-white">
              {singleProduct.description_en}
            </p>
          </div>

          <div className="flex-[0.5] mt-4 lg:mt-0">
            <h1 className="font-semibold">Recommend</h1>

            <div className="grid grid-cols-2 mt-4 gap-4">
              {
                <>
                  {singleProduct?.recommend?.length === 0 && (
                    <p className="text-gray-500 text-sm dark:text-white">Empty Recommend</p>
                  )}
                  {singleProduct.recommend.map((product: any) => {
                    return <Card product={product} />;
                  })}
                </>
              }
            </div>
          </div>
        </div>
      )}
    </m.div>
  );
}

export default Detail;
