import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { ThemeProvider } from "next-themes";
import Navbar from "../components/Navbar";
import { SessionProvider } from "next-auth/react"
import { ProtectedLayout } from '../components/layouts/ProtectedLayouts';
import { LoginLayout } from '../components/layouts/LoginLayouts';

type AppPropsWithAuth = AppProps & {
  Component: {
    requireAuth?: boolean;
    adminOnly?: boolean;
  };
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithAuth) {

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <SessionProvider session={session}>

        <Head>
          <title>Multi-Modal Superb</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="A comprehensive and reproducible benchmark for Self-supervised Speech Representation Learning"
          />
          <meta property="og:image" content="/brand.png" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:url" content="superbbenchmark.org" />
          <meta property="og:title" content="SUPERB: Speech processing Universal PERformance Benchmark" />
          <meta property="og:description" content="A comprehensive and reproducible benchmark for Self-supervised Speech Representation Learning" />
          <meta http-equiv="Permissions-Policy" content="interest-cohort=()"></meta>
        </Head>

        <div className="bg-[#F1F1F1] mt-0 dark:bg-gray-900 font-sans text-gray-500">
          <Navbar />
          {Component.adminOnly ? (
            <ProtectedLayout>
              <Component {...pageProps} />
            </ProtectedLayout>
          ) : (
            Component.requireAuth ? (
              <LoginLayout>
                <Component {...pageProps} />
              </LoginLayout>
            ) : (
              <Component {...pageProps} />
            )

          )}
        </div>
      </SessionProvider>
    </ThemeProvider>
  );
}
