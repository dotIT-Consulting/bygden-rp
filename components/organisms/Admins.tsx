import { Carousel } from "@mantine/carousel";
//@ts-ignore
import Autoplay from "embla-carousel-autoplay";
import {
	Avatar,
	Badge,
	createStyles,
	Group,
	Image,
	Paper,
	Text,
} from "@mantine/core";
import { useRef } from "react";
import React from "react";

const useStyles = createStyles((theme) => ({
	carousel: {
		marginBlock: 16,
		height: 280,
		[theme.fn.smallerThan("sm")]: {
			height: 320,
		},
	},
	carouselIndicator: {
		width: 4,
		height: 4,
		transition: "width 250ms ease",

		"&[data-active]": {
			width: 16,
		},

    [theme.fn.smallerThan("sm")]: {
      marginTop: -48,
    }
	},
}));

const data = [
	{
		username: "LifeGoal",
		picture: "https://discordav.deno.dev/178120781971193856",
		role: [
			<Badge color="orange" variant="outline">
				Utvecklare
			</Badge>,
			<Badge color="red" variant="outline">
				Admin
			</Badge>,
		]
	},
	{
		username: "Raven",
		picture: "https://discordav.deno.dev/228856737959116800",
		role: [
			<Badge color="orange" variant="outline">
				Utvecklare
			</Badge>,
			<Badge color="red" variant="outline">
				Admin
			</Badge>,
		]
	},
	{
		username: "ralf",
		picture: "https://discordav.deno.dev/247788710760939532",
		role: [
			<Badge color="red" variant="outline">
				Admin
			</Badge>,
		],
	},
	{
		username: "Nostric",
		picture: "https://discordav.deno.dev/219817062913015809",
		role: [
			<Badge color="red" variant="outline">
				Admin
			</Badge>,
		],
	},
	{
		username: "Emiliano",
		picture: "https://discordav.deno.dev/231559078713753601",
		role: [
			<Badge color="red" variant="outline">
				Admin
			</Badge>,
		],
	},
	{
		username: "Teexaz",
		picture: "https://discordav.deno.dev/189157686569336832",
		role: [
			<Badge color="red" variant="outline">
				Admin
			</Badge>,
		],
	},
	{
		username: "Snatzy",
		picture: "https://discordav.deno.dev/257951997792092170",
		role: [
			<Badge color="blue" variant="outline">
				Moderator
			</Badge>,
		],
	},
	{
		username: ".Leo",
		picture: "https://discordav.deno.dev/297787467694735360",
		role: [
			<Badge color="blue" variant="outline">
				Moderator
			</Badge>,
		],
	},
];

const AdminsSlider = () => {
	const { classes } = useStyles();
	const autoplay = useRef(Autoplay({ delay: 4000 }));

	const slides = data.map((item, index) => (
		<Carousel.Slide key={index}>
			<Paper
				radius="md"
				withBorder
				p="lg"
				sx={(theme) => ({
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.white,
				})}
			>
				<Avatar src={item.picture} size={120} radius={120} mx="auto" />
				<Text align="center" size="lg" weight={500} mt="md">
					{item.username}
				</Text>
				<Group position="center" spacing="xs" mt={8}>
					{item.role.map((role, index) => (
						<React.Fragment key={index}>{role}</React.Fragment>
					))}
				</Group>
			</Paper>
		</Carousel.Slide>
	));

	return (
		<Carousel
			withIndicators
			slideSize="33.333333%"
			slideGap="md"
			height={280}
			mx="auto"
			breakpoints={[
				{ maxWidth: "md", slideSize: "50%" },
				{ maxWidth: "sm", slideSize: "100%", slideGap: 0 },
			]}
			loop
			withControls={false}
			plugins={[autoplay.current]}
			onMouseEnter={autoplay.current.stop}
			onMouseLeave={autoplay.current.reset}
			classNames={{
				root: classes.carousel,
				indicator: classes.carouselIndicator,
			}}
		>
			{slides}
		</Carousel>
	);
};

export { AdminsSlider };
