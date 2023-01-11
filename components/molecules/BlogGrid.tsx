import { Badge, Card, Center, createStyles, Grid, Group, Image, Text } from "@mantine/core"
import { IconClock, IconEye, IconMessageCircle } from "@tabler/icons";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme, _params, getRef) => {
  const image = getRef('image');

  return {
    card: {
      position: 'relative',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

      [`&:hover .${image}`]: {
        transform: 'scale(1.03)',
      },
    },

    image: {
      ref: image,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: 'cover',
      transition: 'transform 500ms ease',
    },

    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
    },

    content: {
      height: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      zIndex: 1,
    },

    title: {
      color: theme.white,
      marginBottom: 5,
    },

    bodyText: {
      color: theme.colors.dark[2],
      marginLeft: 7,
    },

    author: {
      color: theme.colors.dark[2],
    },
  };
});

const BlogGrid = ({ blogs, limit = true }: any) => {
  const { classes, theme } = useStyles();

  const useFormattedDate = (date: string) => {
    const [formattedDate, setFormattedDate] =useState('');
  
    useEffect(
      () => setFormattedDate(new Date(date).toLocaleDateString("sv-SE")),
      []
    );
  
    return formattedDate;
  };

  return (
    <Grid mt={8}>
      {blogs.slice(0, (limit ? 6 : blogs.length)).map((blog: any, index: number) => (
        <Grid.Col span={4}>
          <Card
            withBorder
            p="lg"
            radius="md"
            className={classes.card}
            component="a"
            href={`./news/${blog.blog.blogSlug}`}
          >
            <Card.Section mb="sm">
              <Image
                src={blog.blog.blogImage.url}
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
              {blog.blog.blogTitle}
            </Text>

            <Group mt="lg">
              <div>
                <Text weight={500}>{blog.author.authorName}</Text>
                <Text size="xs" color="dimmed">
                  Publicerades: {useFormattedDate(blog.createdAt)}
                </Text>
              </div>
            </Group>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  )
}

export { BlogGrid };