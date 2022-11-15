import Link from "next/link";
import React from "react";
import Button from "./Button";
import { useState, useEffect } from "react";
import { getProduct } from "../../api_service/product";
import Image from "next/image";

type Props = {
  closeDrawer: any;
};

function SearchProductDrawer({ closeDrawer }: Props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const getProducts = async () => {
    setLoading(true);
    const response = await getProduct({ name });
    setProducts(response);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [name]);

  return (
    <>
      <div
        className="bg-black opacity-50 fixed h-screen w-full top-0 left-0 z-10 overflow-hidden"
        onClick={closeDrawer}
      ></div>
      <div className="container mx-auto text-white overflow-auto  z-40 fixed  rounded-lg p-4 border top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-[90%] lg:w-[50%]  h-[50vh] lg:h-[70vh] bg-gradient-to-t from-slate-400 to-cyan-500">
        <input
          type="text"
          placeholder="Search Product ..."
          className="placeholder:text-white border bg-transparent text-white px-4 py-2 rounded-lg outline-cyan-500"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div className="mt-4">
          {!loading &&
            products.map((product: any) => (
              <div key={product.id} onClick={closeDrawer}>
                <Link href={`/detail/${product.id}`}>
                  <div className="mt-2 flex  items-center h-20 w-full rounded-lg overflow-hidden outline-none hover:bg-gray-700">
                    <div className="w-32 h-32 object-cover">
                      {/* <Image src={product.image_url} layout="fill" /> */}
                      <img
                        src={product.image_url}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="ml-4">
                      <h1 className="font-semibold text-lg">{product.name}</h1>
                      <h1 className="font-semibold">{product.price} រ</h1>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default SearchProductDrawer;
