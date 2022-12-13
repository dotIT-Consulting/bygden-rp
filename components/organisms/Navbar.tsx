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

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

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
        textDecoration: 'none',
        '&:hover': {
            cursor: 'pointer'
        }
    }
}));

const Navbar = ({ data }: { data: INavData }) => {
    const { classes } = useStyles();

    console.log(data)

    return (
        <Header height={60} withBorder={false} sx={{ backgroundColor: 'transparent' }}>
            <Container className={classes.inner}>
                <Link href="/" rel="canonical" className={classes.link}>
                    <Group>
                        <Image src={data.logoImage.url} height={48} width={24} alt="Website logo" />
                        <Text weight={700} size="xl">{data.title}</Text>
                    </Group>
                </Link>

                <Group spacing={8} className={classes.social} position="right" noWrap>
                    {data?.buttonLinks.map((buttons: ILinkButton) => (
                        <Button component='a' href={buttons.linkUrl} key={buttons.label}>
                            {buttons.label}
                        </Button>
                    ))}
                </Group>
            </Container>
        </Header>
    );
};

export { Navbar };