import { DashRing } from "@atoms/DashRing"
import { Grid, Group, Paper, Skeleton } from "@mantine/core"
import { IconUser } from "@tabler/icons";
import useSWR from "swr";

const ToolsInfo = () => {

  const { data: info, isLoading } = useSWR(
		`/api/bygden/basic-info`,
		{
			refreshInterval: 60 * 1000,
		}
	);

  return (
    <>
      <Grid.Col span={4}>
        <Paper withBorder radius="md" p="xs">
          <Skeleton visible={false}>
            <Group>
              <DashRing
                title="SPELARE ONLINE"
                subtitle={`${info?.online ?? 0} / ${info?.max_slots ?? 0}`}
                value={info?.online ?? 0}
                maxValue={info?.max_slots ?? 0}
                icon={<IconUser size={22} stroke={1.5} />}
              />
            </Group>
          </Skeleton>
        </Paper>
      </Grid.Col>
    </>
  )
}

export { ToolsInfo }