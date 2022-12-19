import { Navbar, Group, ScrollArea, createStyles, Avatar, Text, Button, Divider } from '@mantine/core';
import {
  IconLogout,
  IconHome,
  IconUsers,
  IconLifebuoy,
  IconNews,
  IconChartAreaLine,
  IconDatabase,
  IconMap,
  IconTool,
} from '@tabler/icons';
import { LinksGroup } from '@atoms/LinksGroup';
import { useStore } from '@utils/libs/Zustand';
import shallow from 'zustand/shallow';
import React from 'react';

const mockdata = [
  { label: 'Hem', icon: IconHome, link: '/home' },
  { label: 'Nyheter', icon: IconNews, link: '/news' },
  { label: 'Karaktärer', icon: IconUsers, link: '/characters' },
  { label: 'Statistik', icon: IconChartAreaLine, link: '/stats' },
  { label: 'Ärenden', icon: IconLifebuoy, link: '/tickets' },
  { label: 'Verktyg', icon: IconTool, link: '/tools', admin: true },
  { label: 'Loggar', icon: IconDatabase, link: '/logs', admin: true },
  { label: 'Karta', icon: IconMap, link: '/map', admin: true }
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: '#1A1B1E',
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingTop: 16
  },

  playerLabel: {
    maxWidth: 200,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
}));

const DashboardNavbar = () => {
  const { classes } = useStyles();

  const { steamProfile } = useStore(
    (state) => ({ steamProfile: state.steamProfile }),
    shallow,
  );

  const linkArray = mockdata.filter((element) => {
    if (!steamProfile?.isAdmin) {
      return element.admin !== true
    }

    return element
  })

  const adminIndex = linkArray.find((element) => {
    return element.admin === true
  });

  const links = linkArray.map((item) => (
    <React.Fragment key={item.label}>
      {((adminIndex?.label === item.label) && steamProfile?.isAdmin) ? (
        <Divider label="Staff" labelPosition='center' />
      ) : ( undefined )}
      {<LinksGroup {...item} key={item.label} />}
    </React.Fragment>
  ));

  return (
    <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section className={classes.header}>
        <Group position="left">
          <Avatar radius="md" size="md" src={steamProfile?.photos[2].value} />
          <Text className={classes.playerLabel}>Välkommen {steamProfile?.displayName}!</Text>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Button fullWidth variant="outline" leftIcon={<IconLogout />} component='a' href='../api/auth/logout'>
          Logga ut
        </Button>
      </Navbar.Section>
    </Navbar>
  );
}

export {
  DashboardNavbar
}