import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { Layout } from "@pages/Layout";
import { CustomTheme } from "@utils/CustomTheme";
import { NextRouter, useRouter } from "next/router";
import { Fragment } from "react";
import { DashboardLayout } from "@pages/DashboardLayout";
import router from "@utils/libs/Router";
import { useStore } from "@utils/libs/Zustand";
import shallow from "zustand/shallow";
import { ISteamResponse } from "@utils/Types";
import  { SWRConfig } from 'swr'

const SITE_URL = process.env.NODE_ENV === 'production' ? process.env.SITE_URL : 'http://localhost:3000/'

export default function App(props: AppProps & {
  steam: {
    user: ISteamResponse
  }
}) {
  const { setSteamProfile } = useStore(
    (state) => ({ setSteamProfile: state.setSteamProfile }),
    shallow,
  );

  const { Component } = props;
  const router = useRouter();
  const PageLayout = GetLayout(router);

  if (props.steam !== null) {
    setSteamProfile(props.steam.user)
  }

  return (
    <>
      <Head>
        <title>Bygden RP</title>
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={CustomTheme}
      >
        <SWRConfig 
          value={{
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
          <PageLayout>
            <Component {...props} />
          </PageLayout>
        </SWRConfig>
      </MantineProvider>
    </>
  );
}

const GetLayout = (path: NextRouter) => {
  const { pathname } = path;

  if (pathname.startsWith('/dashboard')) {
    return DashboardLayout
  }

  if (pathname.startsWith('/')) {
    return Layout
  }

  return Fragment
}

App.getInitialProps = async (initial: any) => {
  const { ctx } = initial;

  if (ctx?.pathname?.startsWith('/dashboard') || ctx?.pathname?.startsWith('/auth')) {
    await router.run(ctx.req, ctx.res);
  }

  if (!ctx?.req?.user && ctx?.pathname?.startsWith('/dashboard')) {
    ctx.res.writeHead(301, { Location:`${SITE_URL}auth` });
    ctx.res.end();
  }

  return {
    steam: {
      user: ctx?.req?.user || null
    },
    revalidate: 60
  }
}