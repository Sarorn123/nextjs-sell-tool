import Head from "next/head";
import React from "react";
import { getProduct, getSingleProduct } from "../../api_service/product";
import Card from "../../components/utils/Card";
import { wrapper } from "../../redux/store";
import { checkServerSideAuth } from "../../utils/serversideAuthentication";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    checkServerSideAuth(ctx, store);
    await getProduct({});
    return {
      props: {},
    };
  }
);

type Props = {};

const Index = (props: Props) => {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Sell Tool - About</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-4">
        <h1 className="font-semibold">About Us</h1>
        <p className="text-sm mt-4 text-slate-500 dark:text-white">
          A remarkable about page is genuine, approachable, and distinguished.
          It should give the visitor a glimpse into what working with you might
          be like. You can include personal interests, stories, and photos that
          convey the unique story of your business. You may also include
          information about who’s on your team and what their roles are. About
          pages are personal to you and your company, so the structure of your
          about page will vary based on what you want to highlight. However,
          you’ll start with the same writing process.
          A remarkable about page is genuine, approachable, and distinguished.
          It should give the visitor a glimpse into what working with you might
          be like. You can include personal interests, stories, and photos that
          convey the unique story of your business. You may also include
          information about who’s on your team and what their roles are. About
          pages are personal to you and your company, so the structure of your
          about page will vary based on what you want to highlight. However,
          you’ll start with the same writing process.
        </p>
      </main>
    </div>
  );
};

export default Index;
