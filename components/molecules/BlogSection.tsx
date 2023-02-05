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
import { IconNews } from "@tabler/icons";
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

const BlogSection = ({ posts }: any) => {
  const { classes } = useStyles();

	const getBadeColor = (type: string) => {
    switch (type) {
      case 'UPPDATERING':
        return 'green'

      case 'NYHET':
        return 'orange';

      case 'EVENT':
        return 'grape';
    
      default:
        return 'blue'
    }
  }

  const useFormattedDate = (date: string) => {
    const [formattedDate, setFormattedDate] =useState('');
  
    useEffect(
      () => setFormattedDate(new Date(date).toLocaleDateString("sv-SE")),
      []
    );
  
    return formattedDate;
  };

	return (
		<Paper withBorder radius="md" p="xs">
			<Group mb={8} position="left">
				<IconNews size={24} />
				<Title order={3} transform="uppercase">
					Nyheter
				</Title>
			</Group>


			<Grid mt={8}>
				{posts.map((post: any) => (
					<Grid.Col span={4} key={post.blog.blogSlug}>
						<Card
							withBorder
							p="lg"
							radius="md"
							className={classes.card}
							component="a"
							href={`./news/${post.blog.blogSlug}`}
						>
							<Card.Section mb="sm">
								<Image
									src={post.blog.blogImage.url}
									alt="Article image"
									height={180}
									fit="contain"
								/>
							</Card.Section>

							{post.blog.type ? (
								<Badge color={getBadeColor(post.blog.type)}>{post.blog.type}</Badge>
							): null}

							<Text
								weight={700}
								className={classes.title}
								mt="xs"
								lineClamp={1}
							>
								{post.blog.blogTitle}
							</Text>

							<Group mt="lg">
								<div>
									<Text weight={500}>Raven</Text>
									<Text size="xs" color="dimmed">
										Publicerades: {useFormattedDate(post.createdAt)}
									</Text>
								</div>
							</Group>
						</Card>
					</Grid.Col>
				))}
			</Grid>
		</Paper>
	);
};

export { BlogSection };
