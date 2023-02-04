import { DashRing } from "@atoms/DashRing"
import { Grid, Group, Paper, Skeleton } from "@mantine/core"
import { IconCash, IconSword, IconUser } from "@tabler/icons";
import { useStore } from "@utils/libs/Zustand";
import useSWR from "swr";
import shallow from "zustand/shallow";

const ToolsInfo = () => {

  const { steamProfile } = useStore(
		(state) => ({
			steamProfile: state.steamProfile
		}),
		shallow
	);

  const { data: info, isLoading } = useSWR(
		`/api/bygden/basic-info`,
		{
			refreshInterval: 60 * 1000,
		}
	);

  return (
    <Grid>
      <Grid.Col span={4}>
        <Paper withBorder radius="md" p="xs">
          <Skeleton visible={isLoading}>
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

      <Grid.Col span={4}>
        <Paper withBorder radius="md" p="xs">
          <Skeleton visible={isLoading}>
            <Group>
              <DashRing
                title="TOTAL EKONOMI"
                subtitle={Intl.NumberFormat("sv-SE", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(info?.economy ?? 0)}
                color="green"
                icon={<IconCash size={22} stroke={1.5} />}
              />
            </Group>
          </Skeleton>
        </Paper>
      </Grid.Col>

      <Grid.Col span={4}>
        <Paper withBorder radius="md" p="xs">
          <Skeleton visible={isLoading}>
            <Group>
              <DashRing
                title="ADMINS"
                subtitle={`${steamProfile?.staff?.numStaff ?? 0}`}
                color="red"
                icon={<IconSword size={22} stroke={1.5} />}
              />
            </Group>
          </Skeleton>
        </Paper>
      </Grid.Col>
    </Grid>
  )
}

export { ToolsInfo }