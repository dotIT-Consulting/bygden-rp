import Head from 'next/head';
import { useRouter } from 'next/router';
import type { ILayoutProps } from '@utils/Types';
import { AppShell } from '@mantine/core';
import { DashboardNavbar } from '@organisms/DashboardNavbar';

const DashboardLayout = ({ children, meta: pageMeta }: ILayoutProps) => {
  const router = useRouter();

  const meta = {
    title: 'Bygden RP - Den bästa RP servern genom tiderna',
    description: 'Bygden RP är en FiveM RP server mest fokus på det ovanliga och gemenskapen, hos oss kommer du aldrig ha en tråkig stund och det kan vi lova!',
    cardImage: '/og.png',
    ...pageMeta
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://bygdenrp.se${router.asPath}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.cardImage} />
      </Head>
      <AppShell navbar={<DashboardNavbar />}>
          {children}
      </AppShell>
    </>
  );
}

export {
  DashboardLayout
}