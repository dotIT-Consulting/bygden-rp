import { DashRing } from "@atoms/DashRing"
import { Grid, Group, Paper } from "@mantine/core"
import { IconCash, IconDeviceGamepad, IconUsers } from "@tabler/icons"

const DashInfo = ({ serverInfo } : { serverInfo: any }) => {

  return (
    <>
      <Grid.Col span={4}>
        <Paper withBorder radius="md" p="xs">
          <Group>
            <DashRing
              title="SPELARE ONLINE"
              subtitle={`${serverInfo?.online ?? 0} / ${serverInfo?.max_slots ?? 0}`}
              value={serverInfo?.online ?? 0}
              maxValue={serverInfo?.max_slots ?? 0}
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
              subtitle={`${serverInfo?.characters ?? 0} / 3`}
              icon={
                <IconDeviceGamepad size={22} stroke={1.5} />
              }
              value={serverInfo?.characters ?? 0}
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
              subtitle={Intl.NumberFormat("sv-SE", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(serverInfo?.economy ?? 0)}
              color="green"
              icon={<IconCash size={22} stroke={1.5} />}
            />
          </Group>
        </Paper>
      </Grid.Col>
    </>
  )
}

export {
  DashInfo
}