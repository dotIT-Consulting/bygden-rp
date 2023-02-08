import { Button, Center, Container, createStyles, Divider, Grid, Group, MultiSelect, Paper, Stack, Switch, Text, Title } from "@mantine/core"
import { AdminTable } from "@organisms/AdminsTable";
import { IconBrandDiscord, IconShield } from "@tabler/icons";
import { useStore } from "@utils/libs/Zustand";
import useSWR from 'swr';
import shallow from "zustand/shallow";

const useStyles = createStyles((theme) => ({
  headerPaper: {
    height: 300
  },
  input: {
    height: 36,
    overflowY: 'scroll',
    '::-webkit-scrollbar': {
      display: 'none'
    }
  }
}))

const Settings = () => {
  const { classes } = useStyles();
  const { data, isLoading } = useSWR('/api/admin/fetch-admins');

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

            <AdminTable data={data} isLoading={isLoading} />
          </Paper>
        </Grid.Col>

        <Grid.Col span={3}>
          <Paper withBorder radius="md" p="xs" className={classes.headerPaper}>
            <Group mb={8} position="left">
              <IconBrandDiscord size={24} />
              <Title order={3} transform="uppercase">
                Discord
              </Title>
            </Group>

            <Grid>
              <Grid.Col span={6}>
              <Text size="sm" color="dimmed" mb={8}>Logga borttagna meddelanden.</Text>
                <Switch color="orange" />
              </Grid.Col>

              <Grid.Col span={6}>
                <Text size="sm" color="dimmed" mb={8}>Logga borttagna tickets.</Text>
                <Switch color="orange" />
              </Grid.Col>

              <Grid.Col span={6}>
                <MultiSelect
                  data={[
                    { value: '0', label: "Textkanaler" },
                    { value: '2', label: "Röstkanaler" },
                    { value: '4', label: "Kategorier" },
                    { value: '5', label: "Announcements" },
                    { value: '10', label: "Announcement trådar" },
                    { value: '11', label: "Trådar" },
                    { value: '13', label: "Stage röst kanaler" },
                    { value: '15', label: "Forum" },
                  ]}
                  label="Ignorerade kanal-typer."
                  placeholder="Välj typer av kanaler som ska ignoreras."
                  classNames={{
                    input: classes.input
                  }}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <MultiSelect
                  data={[
                    { value: '123', label: "BYGDENRP" },
                    { value: '123', label: "STAFFS" },
                    { value: '123', label: "SUPPORT" },
                    { value: '123', label: "TICKETS" },
                    { value: '123', label: "TEXTKANALER" },
                    { value: '123', label: "JOBB" },
                    { value: '123', label: "ARBETEN" },
                    { value: '123', label: "RÖSTKANALER" },
                  ]}
                  label="Ignorerade kanaler."
                  placeholder="Välj kanaler som ska ignoreras."
                  classNames={{
                    input: classes.input
                  }}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <MultiSelect
                  data={[
                    { value: '123', label: "BYGDENRP" },
                    { value: '123', label: "STAFFS" },
                    { value: '123', label: "SUPPORT" },
                    { value: '123', label: "TICKETS" },
                    { value: '123', label: "TEXTKANALER" },
                    { value: '123', label: "JOBB" },
                    { value: '123', label: "ARBETEN" },
                    { value: '123', label: "RÖSTKANALER" },
                  ]}
                  label="Ticket kategori"
                  placeholder="Välj kategorin som innehåller Tickets."
                  classNames={{
                    input: classes.input
                  }}
                />
              </Grid.Col>
            </Grid>
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
