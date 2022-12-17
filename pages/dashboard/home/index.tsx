import { DashRing } from "@atoms/DashRing";
import { Badge, Card, Container, createStyles, Grid, Group, Image, Paper, Text, Title } from "@mantine/core"
import { IconCash, IconDeviceGamepad, IconUsers } from "@tabler/icons";
import { ISteamProps } from "@utils/Types";
import { useEffect, useState } from "react";
import useSWR from 'swr'

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

const Home = (props: ISteamProps) => {
  const { user: steam } = props.steam;
  const { classes } = useStyles();

  const [date, setDate] = useState('1970-01-01');

  const { data: Characters = 0 } = useSWR(`/api/bygden/player-info?steam=${steam.hex_id_format}`)
  const { data: Economy = 0} = useSWR('/api/bygden/server-economy')
  const { data: OnlinePlayers = 0 } = useSWR('/api/bygden/server-info', {
    refreshInterval: 10 * 1000
  })

  useEffect(() => {
    setDate(new Date(Date.now()).toLocaleString());
  }, [])

  return (
    <Container>
      <Grid>
        <Grid.Col span={4}>
          <Paper withBorder radius="md" p="xs">
            <Group>
              <DashRing
                title="SPELARE ONLINE"
                subtitle={`${OnlinePlayers?.length ?? 0} / 64`}
                value={OnlinePlayers?.length ?? 0}
                maxValue={64}
                icon={<IconUsers size={22} stroke={1.5} />}
              />
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col span={4}>
          <Paper withBorder radius="md" p="xs">
            <Group>
              <DashRing
                title="ANTAL KARAKTÄRER"
                subtitle={`${Characters?.number ?? 0} / 3`}
                icon={<IconDeviceGamepad size={22} stroke={1.5} />}
                value={Characters?.number ?? 0}
                maxValue={3}
              />
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col span={4}>
          <Paper withBorder radius="md" p="xs">
            <Group>
              <DashRing
                title="TOTAL EKONOMI"
                subtitle={Economy.total}
                color="green"
                icon={
                  <IconCash size={22} stroke={1.5} />
                }
              />
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>

      <Paper withBorder radius="md" p="xs" mt={32}>
        <Group position="apart">
          <Title order={3} transform="uppercase">Senaste nyheterna</Title>
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