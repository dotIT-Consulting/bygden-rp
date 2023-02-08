import { Container, createStyles, Divider, Grid, Group, Paper, Title } from "@mantine/core";
import { ToolsInfo } from "@molecules/ToolsInfo";
import { IconUser } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  mainArea: {
    width: '100%',
    height: 'fill'
  }
}))

const Tools = () => {
  const { classes } = useStyles();

  return (
    <Container fluid>
			<ToolsInfo />
      <Divider mt={16} mb={16} />

      <Paper withBorder radius="md" p="xs">
        <Grid>
          <Grid.Col span={4}>
            <Paper withBorder radius="md" p="xs" sx={{ height: 400, width: '100%'}}>
              <Group mb={8} position="left">
                <IconUser size={24} />
                <Title order={3} transform="uppercase">
                  Sök efter spelare
                </Title>
              </Group>
            </Paper>
          </Grid.Col>

          <Grid.Col span={4}>
            <Paper withBorder radius="md" p="xs" sx={{ height: 400, width: '100%'}}>

            </Paper>
          </Grid.Col>

          <Grid.Col span={4}>
            <Paper withBorder radius="md" p="xs" sx={{ height: 400, width: '100%'}}>

            </Paper>
          </Grid.Col>
        </Grid>
      </Paper>

    </Container>
  )
}

export default Tools;