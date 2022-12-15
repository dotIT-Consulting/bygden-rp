import {
  Text,
  Container,
  createStyles,
  Group,
  Header,
  Image,
  Button,
} from '@mantine/core';
import React from 'react';
import Link from 'next/link';
import type { ILinkButton, INavData } from '@utils/Types';
import { Icons } from '@utils/Icons';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start'
    }
  },

  social: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto'
    }
  },

  link: {
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
      color: 'black'
    }
  }
}));

const Navbar = (props: INavData) => {
  const { classes } = useStyles();

  return (
    <Header height={60} withBorder={false} sx={{ backgroundColor: 'transparent' }}>
      <Container className={classes.inner}>
        <Link href="/" rel="canonical" className={classes.link}>
          <Group>
            {props.logoImage?.url ? (
              <Image src={props.logoImage.url} height={48} width={24} alt="Website logo" />
            ) : undefined}
            <Text weight={700} size="xl">{props.title}</Text>
          </Group>
        </Link>

        <Group spacing={8} className={classes.social} position="right" noWrap>
          {props?.buttonLinks.map((buttons: ILinkButton) => {
            const variant = buttons.buttonStyle?.toLowerCase() as typeof buttons.buttonStyle;
            return (
              <Button
                component='a'
                variant={variant}
                href={buttons.linkUrl}
                key={buttons.label}
                leftIcon={<Icons type={buttons.buttonIcon} />}
              >
                {buttons.label}
              </Button>
            )
          })}
        </Group>
      </Container>
    </Header>
  );
};

export { Navbar };