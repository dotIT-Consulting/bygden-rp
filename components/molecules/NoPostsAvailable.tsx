import { Paper, Stack, Title } from "@mantine/core";

const NoPostsAvailable = () => {

  return (
    <Paper p="xl" mih={75} mt={16} mb={32}>
      <Stack align="center">
        <Title order={4}>
          Tyvärr så finns det inga nyheter tillgängliga just nu! 
        </Title>
      </Stack>
    </Paper>
  )
}

export { NoPostsAvailable };