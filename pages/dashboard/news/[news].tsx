import { Hygraph } from "@utils/libs/Hygraph";
import {
	Anchor,
	Center,
	Container,
	Title,
	Box,
	Divider,
	Text,
	TypographyStylesProvider,
	Paper,
	Image,
	Group,
	Avatar,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import { useEffect, useState } from "react";

export async function getServerSideProps({ params }: any) {
	const { blogPosts } = await Hygraph.request(
		`
    query ProductPageQuery($slug: String) {
      blogPosts(
        where: {
          blog: {
            blogSlug: $slug
          }
        }
      ) {
        createdAt
        blog {
          blogTitle
          blogSlug
          blogBody {
            html
          }
          blogImage {
            url
          }
        }
        author {
          authorName
          authorPicture {
            url
          }
        }
      }
    }
  `,
		{
			slug: params.news,
		}
	);

	return {
		props: {
			blog: blogPosts[0],
		},
	};
}

const BlogPost = ({ pageProps }: any) => {
	const { blog } = pageProps;

	const useFormattedDate = (date: string) => {
		const [formattedDate, setFormattedDate] = useState("");

		useEffect(
			() => setFormattedDate(new Date(date).toLocaleString("sv-SE")),
			[]
		);

		return formattedDate;
	};

	return (
		<Container mt="5vh">
			<Paper p="xl">
				<Anchor href="./">
					<Center inline>
						<IconArrowLeft size={14} />
						<Box ml={5}>Se alla nyheter</Box>
					</Center>
				</Anchor>

				<Image
					mt={16}
					width="100%"
					height={200}
					fit="contain"
					src={blog?.blog?.blogImage?.url}
				/>

				<Group mt={16}>
					<Avatar
						src={blog?.author?.authorPicture?.url}
						alt={blog?.author?.authorName}
						radius="xl"
					/>
					<div>
						<Text size="sm">{blog?.author?.authorName}</Text>
						<Text size="xs" color="dimmed">
							{useFormattedDate(blog?.createdAt)}
						</Text>
					</div>
				</Group>

				<Title order={3} lineClamp={1}>
					{blog?.blog?.title}
				</Title>
				<Divider size="lg" mt={16} mb={16} />
				<TypographyStylesProvider>
					<div
						dangerouslySetInnerHTML={{
							__html: blog?.blog?.blogBody?.html,
						}}
					/>
				</TypographyStylesProvider>
			</Paper>
		</Container>
	);
};

export default BlogPost;
