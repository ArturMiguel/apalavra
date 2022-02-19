import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  if (typeof document === "undefined") {
    React.useLayoutEffect = React.useEffect;
  }

  return (
    <>
      <Head>
        <title>APALAVRA</title>
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default MyApp;
