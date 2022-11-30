import Head from "next/head";
import React from "react";
import Card from "../../components/utils/Card";
import { useAppSelector } from '../../redux/hook';
import { getProductState, setProduct } from '../../redux/slice/productSlice';
import { wrapper } from '../../redux/store';
import { getProduct } from '../../api_service/product/index';
import { checkServerSideAuth } from '../../utils/serversideAuthentication';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    checkServerSideAuth(ctx, store);
    const params = { categoryId: 4 }; // it is another categoryId
    const res = await getProduct(params);
    const data = {
      product: res,
      actionType: "getAll",
    };
    store.dispatch(setProduct(data));
    return {
      props: {},
    };
  }
);

type Props = {};

const Index = (props: Props) => {
  const tools = [1, 2, 3, 4, 5, 4, 5, 6, 6, 5, , 4, 4, 4, 33, 3];
  const { product } = useAppSelector(getProductState);
  return (
    <div className="container mx-auto">
      <Head>
        <title>Sell Tool - Another Tools</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-lg lg:text-xl font-semibold mt-4">
          Another Tools
        </h1>

        {/* Demo Some Tools */}

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {product.length === 0 ? (
            <h1>No data</h1>
          ) : (
            <>
              {product.map((singleProduct: any) => (
                <Card product={singleProduct} key={singleProduct.id} />
              ))}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
