import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect } from 'react';
import { initDatadogRUM } from '../utils/datadog';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initDatadogRUM();
  }, []);

  return (
    <>
      <Head>
        <title>Tic Tac Toe</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🕹</text></svg>"
        />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default MyApp;
