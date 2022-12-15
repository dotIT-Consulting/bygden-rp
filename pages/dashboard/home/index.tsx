import { Anchor, Badge, Card, Center, Container, createStyles, Grid, Group, Image, Paper, RingProgress, Text, Title } from "@mantine/core"
import { IconCash, IconDeviceGamepad, IconUsers } from "@tabler/icons";
import { useEffect } from "react";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    maxWidth: '100%',
    lineClamp: 1,
    textOverflow: 'ellapsis',
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

const Home = () => {
  const { classes } = useStyles();

  let date = '2022-12-12';

  useEffect(() => {
    date = new Date(Date.now()).toLocaleString()
  }, [])

  return (
    <Container>
      <Grid>
        <Grid.Col span={4}>
          <Paper withBorder radius="md" p="xs">
            <Group>
              <RingProgress
                size={80}
                roundCaps
                thickness={8}
                sections={[{ value: (100 * 9) / 64, color: 'green' }]}
                label={
                  <Center>
                    <IconUsers size={22} stroke={1.5} />
                  </Center>
                }
              />

              <div>
                <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                  SPELARE ONLINE
                </Text>
                <Text weight={700} size="xl">
                  9 / 64
                </Text>
              </div>
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col span={4}>
          <Paper withBorder radius="md" p="xs">
            <Group>
              <RingProgress
                size={80}
                roundCaps
                thickness={8}
                sections={[{ value: (100 * 2) / 3, color: 'orange' }]}
                label={
                  <Center>
                    <IconDeviceGamepad size={22} stroke={1.5} />
                  </Center>
                }
              />

              <div>
                <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                  ANTAL KARAKTÄRER
                </Text>
                <Text weight={700} size="xl">
                  2 / 3
                </Text>
              </div>
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col span={4}>
          <Paper withBorder radius="md" p="xs">
            <Group>
              <RingProgress
                size={80}
                roundCaps
                thickness={8}
                sections={[{ value: 100, color: 'green' }]}
                label={
                  <Center>
                    <IconCash size={22} stroke={1.5} />
                  </Center>
                }
              />

              <div>
                <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                  TOTAL EKONOMI
                </Text>
                <Text weight={700} size="xl">
                  100 000 000 SEK
                </Text>
              </div>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>

      <Paper withBorder radius="md" p="xs" mt={32}>
        <Group position="apart">
          <Title order={3}>Senaste nyheterna</Title>
          <Anchor>
            <Text size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
              LÄS MER
            </Text>
          </Anchor>
        </Group>

        <Grid mt={8}>
          <Grid.Col span={4}>
            <Card withBorder p="lg" radius="md" className={classes.card}>
              <Card.Section mb="sm">
                <Image src='https://wallpaperaccess.com/full/899965.jpg' alt="Article image" height={180} />
              </Card.Section>

              <Badge color="green">UPPDATERING</Badge>

              <Text weight={700} className={classes.title} mt="xs" lineClamp={1}>
                Detta är ett exempel på en nyhet
              </Text>

              <Group mt="lg">
                <div>
                  <Text weight={500}>LifeGoal</Text>
                  <Text size="xs" color="dimmed">
                    Publiserades: {date}
                  </Text>
                </div>
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={4}>
            <Card withBorder p="lg" radius="md" className={classes.card}>
              <Card.Section mb="sm">
                <Image src='https://wallpaperaccess.com/full/899965.jpg' alt="Article image" height={180} />
              </Card.Section>

              <Badge color="green">UPPDATERING</Badge>

              <Text weight={700} className={classes.title} mt="xs" lineClamp={1}>
                Detta är ett exempel på en nyhet
              </Text>

              <Group mt="lg">
                <div>
                  <Text weight={500}>LifeGoal</Text>
                  <Text size="xs" color="dimmed">
                    Publiserades: {date}
                  </Text>
                </div>
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={4}>
            <Card withBorder p="lg" radius="md" className={classes.card}>
              <Card.Section mb="sm">
                <Image src='https://wallpaperaccess.com/full/899965.jpg' alt="Article image" height={180} />
              </Card.Section>

              <Badge color="green">UPPDATERING</Badge>

              <Text weight={700} className={classes.title} mt="xs" lineClamp={1}>
                Detta är ett exempel på en nyhet
              </Text>

              <Group mt="lg">
                <div>
                  <Text weight={500}>LifeGoal</Text>
                  <Text size="xs" color="dimmed">
                    Publiserades: {date}
                  </Text>
                </div>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Home;