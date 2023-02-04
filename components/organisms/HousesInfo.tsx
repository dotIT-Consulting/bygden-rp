import { Grid, Group, Paper, Skeleton, Stack, Title, Text } from "@mantine/core"
import { IconHome } from "@tabler/icons"

const HousesInfo = ({ info, isLoading} : { info: any, isLoading: boolean }) => {

  return (
    <Grid.Col span={3}>
      <Paper withBorder radius="md" p="xs" sx={{ maxHeight: 500, height: 500 }}>
        <Group mb={8} position="left">
          <IconHome size={24} />
          <Title order={3} transform="uppercase">
            Fastigheter
          </Title>
        </Group>

        <Skeleton visible={isLoading} height={435}>
          <Grid grow>
            <Grid.Col span={4}>
              <Stack spacing={4}>
                {info?.length === 0 ? (
                  <Text>Du äger inga fastigheter.</Text>
                ) : undefined}
              </Stack>
            </Grid.Col>
          </Grid>
        </Skeleton>
      </Paper>
    </Grid.Col>
  )
}

export { HousesInfo }