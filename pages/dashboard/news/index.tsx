import { BlogGrid } from "@molecules/BlogGrid";
import { NoPostsAvailable } from "@molecules/NoPostsAvailable";
import { Hygraph } from "@utils/libs/Hygraph";
import { Group, Paper, Title } from "@mantine/core";

const BlogIndex = ({ pageProps }: any) => {
  const { blogPosts } = pageProps;

  return (
    <Paper withBorder radius="md" p="xs">
			<Group position="apart">
				<Title order={3} transform="uppercase">
					Senaste nyheterna
				</Title>
			</Group>

      {blogPosts.length === 0 ? (
        <NoPostsAvailable />
      ) : (
        <BlogGrid blogs={blogPosts} limit={false}/>
      )}
    </Paper>
  )
}

export async function getServerSideProps() {
  const { blogPosts } = await Hygraph.request(`
    {
      blogPosts {
        createdAt
        blog {
          blogTitle
          blogSlug
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
  `)

  return {
    props: {
      blogPosts
    }
  };
}

export default BlogIndex;