import { Button, Center, Container, createStyles, Divider, Grid, Group, Paper, Stack, Text, Title } from "@mantine/core"
import { AdminTable } from "@organisms/AdminsTable";
import { IconShield } from "@tabler/icons";
import { useStore } from "@utils/libs/Zustand";
import useSWR from 'swr';
import shallow from "zustand/shallow";

const useStyles = createStyles((theme) => ({
  headerPaper: {
    height: 300
  }
}))

const Settings = () => {
  const { classes } = useStyles();

  const { steamProfile } = useStore(
		(state) => ({
			steamProfile: state.steamProfile,
		}),
		shallow
	);

  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={5}>
          <Paper withBorder radius="md" p="xs" className={classes.headerPaper}>
            <Group mb={8} position="left">
              <IconShield size={24} />
              <Title order={3} transform="uppercase">
                Administratörer
              </Title>
            </Group>

            <AdminTable />
          </Paper>
        </Grid.Col>

        <Grid.Col span={3}>
          <Paper withBorder radius="md" p="xs" className={classes.headerPaper}>

          </Paper>
        </Grid.Col>

        <Grid.Col span={4}>
          <Paper withBorder radius="md" p="xs" className={classes.headerPaper}>

          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default Settings