import {
	Badge,
	Card,
	createStyles,
	Grid,
	Group,
	Image,
	Paper,
	Text,
	Title,
} from "@mantine/core";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.dark[7],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    maxWidth: '100%',
    lineClamp: 1,
    textOverflow: 'ellapsis',
  },
}));

const BlogSection = () => {
  const { classes } = useStyles();
  const [date, setDate] = useState('1970-01-01');

  useEffect(() => {
    setDate(new Date(Date.now()).toLocaleString());
  }, [])

	return (
		<Paper withBorder radius="md" p="xs">
			<Group position="apart">
				<Title order={3} transform="uppercase">
					Senaste nyheterna
				</Title>
			</Group>

			<Grid mt={8}>
				<Grid.Col span={4}>
					<Card
						withBorder
						p="lg"
						radius="md"
						className={classes.card}
					>
						<Card.Section mb="sm">
							<Image
								src="https://wallpaperaccess.com/full/899965.jpg"
								alt="Article image"
								height={180}
							/>
						</Card.Section>

						<Badge color="green">UPPDATERING</Badge>

						<Text
							weight={700}
							className={classes.title}
							mt="xs"
							lineClamp={1}
						>
							Detta är ett exempel på en nyhet
						</Text>

						<Group mt="lg">
							<div>
								<Text weight={500}>Raven</Text>
								<Text size="xs" color="dimmed">
									Publicerades: {date}
								</Text>
							</div>
						</Group>
					</Card>
				</Grid.Col>

				<Grid.Col span={4}>
					<Card
						withBorder
						p="lg"
						radius="md"
						className={classes.card}
					>
						<Card.Section mb="sm">
							<Image
								src="https://wallpaperaccess.com/full/899965.jpg"
								alt="Article image"
								height={180}
							/>
						</Card.Section>

						<Badge color="green">UPPDATERING</Badge>

						<Text
							weight={700}
							className={classes.title}
							mt="xs"
							lineClamp={1}
						>
							Detta är ett exempel på en nyhet
						</Text>

						<Group mt="lg">
							<div>
								<Text weight={500}>Raven</Text>
								<Text size="xs" color="dimmed">
									Publicerades: {date}
								</Text>
							</div>
						</Group>
					</Card>
				</Grid.Col>

				<Grid.Col span={4}>
					<Card
						withBorder
						p="lg"
						radius="md"
						className={classes.card}
					>
						<Card.Section mb="sm">
							<Image
								src="https://wallpaperaccess.com/full/899965.jpg"
								alt="Article image"
								height={180}
							/>
						</Card.Section>

						<Badge color="green">UPPDATERING</Badge>

						<Text
							weight={700}
							className={classes.title}
							mt="xs"
							lineClamp={1}
						>
							Detta är ett exempel på en nyhet
						</Text>

						<Group mt="lg">
							<div>
								<Text weight={500}>Raven</Text>
								<Text size="xs" color="dimmed">
									Publicerades: {date}
								</Text>
							</div>
						</Group>
					</Card>
				</Grid.Col>
			</Grid>
		</Paper>
	);
};

export { BlogSection };
