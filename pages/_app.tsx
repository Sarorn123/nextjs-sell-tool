import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { Provider } from "react-redux";
import { wrapper } from "../redux/store";
import { AnimatePresence } from "framer-motion";
import { Router } from "next/router";

function MyApp({ Component, pageProps , router}: AppProps) {
  return (
    <AnimatePresence >
      <Layout>{<Component key={router.pathname} {...pageProps} />}</Layout>
    </AnimatePresence>
  );
}

export default wrapper.withRedux(MyApp);
