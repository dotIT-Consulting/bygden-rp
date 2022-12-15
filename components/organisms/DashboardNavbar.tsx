import { Navbar, Group, Code, ScrollArea, createStyles, Avatar, Text, Button } from '@mantine/core';
import {
  IconLogout,
  IconHome,
  IconUsers,
  IconLifebuoy,
} from '@tabler/icons';
import { LinksGroup } from '@atoms/LinksGroup';
import { useStore } from '@utils/libs/Zustand';
import shallow from 'zustand/shallow';
//import { Logo } from './Logo';

const mockdata = [
  { label: 'Hem', icon: IconHome },
  { label: 'Karaktärer', icon: IconUsers },
  { label: 'Ärenden', icon: IconLifebuoy },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: '#111',
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
    paddingBlock: 16
  },

  playerLabel: {
    maxWidth: 200,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
}));

const DashboardNavbar = () => {
  const { classes } = useStyles();
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  const { steamProfile } = useStore(
    (state) => ({ steamProfile: state.steamProfile }),
    shallow,
  );

  return (
    <Navbar height={800} width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section className={classes.header}>
        <Group position="left">
          <Avatar radius="md" size="md" src={steamProfile?.photos[2].value} />
          <Text className={classes.playerLabel}>Välkommen {steamProfile?.displayName}</Text>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Button fullWidth leftIcon={<IconLogout />} component='a' href='../api/auth/logout'>
          Logga ut
        </Button>
      </Navbar.Section>
    </Navbar>
  );
}

export {
  DashboardNavbar
}