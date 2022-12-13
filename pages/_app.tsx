import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { Layout } from "@pages/Layout";
import { Hygraph } from "@utils/libs/Hygraph";
import { CustomTheme } from "@utils/CustomTheme";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  //@ts-ignore
  const navData = props.extra.navbar;

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
        <Layout navData={navData}>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  );
}

App.getInitialProps = async () => {
  const { navbars } = await Hygraph.request(`
    {
      navbars(last: 1) {
        logoImage {
          url
        }
        title
        buttonLinks {
          ... on ButtonLink {
            label
            linkUrl
            buttonIcon
            buttonStyle
          }
        }
      }
    }
  `)

  const navbar = navbars.pop();

  return {
    extra: {
      navbar
    },
    revalidate: 60
  }
}