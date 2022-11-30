import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { wrapper } from "../redux/store";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps , router}: AppProps) {
  return (
    <AnimatePresence >
      <Layout>{<Component key={router.pathname} {...pageProps} />}</Layout>
    </AnimatePresence>
  );
}

export default wrapper.withRedux(MyApp);
