import { BlogGrid } from "@molecules/BlogGrid";
import { NoPostsAvailable } from "@molecules/NoPostsAvailable";
import { Hygraph } from "@utils/libs/Hygraph";
import { Container, Group, Paper, Title } from "@mantine/core";

const BlogIndex = ({ pageProps }: any) => {
  const { blogPosts } = pageProps;

  return (
    <Container size="xl" mt="xl">
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
    </Container>
  )
}

export async function getServerSideProps() {
  const { blogPosts } = await Hygraph.request(`
    {
      blogPosts {
        createdAt
        blog {
          type
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