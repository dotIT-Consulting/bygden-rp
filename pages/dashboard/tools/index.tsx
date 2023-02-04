import { Container, createStyles, Divider, Paper } from "@mantine/core";
import { ToolsInfo } from "@molecules/ToolsInfo";

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

      </Paper>

    </Container>
  )
}

export default Tools;