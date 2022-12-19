import { DashRing } from "@atoms/DashRing";
import {
	Code,
	Container,
	Grid,
	Group,
	List,
	Paper,
	ScrollArea,
  Table,
  Title,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { BlogSection } from "@molecules/BlogSection";
import { IconCash, IconDeviceGamepad, IconUsers } from "@tabler/icons";
import { IServerListPlayer, ISteamProps } from "@utils/Types";
import useSWR from "swr";

const Home = (props: ISteamProps) => {
	const { user: steam } = props.steam;
	const { ref, height } = useElementSize();

	const { data: info } = useSWR(
		`/api/bygden/basic-info?license=${steam.fivemLicenseFormat}`,
		{
			refreshInterval: 60 * 1000,
		}
	);

	return (
		<Container fluid>
			<Grid>
				<Grid.Col span={4}>
					<Paper withBorder radius="md" p="xs">
						<Group>
							<DashRing
								title="SPELARE ONLINE"
								subtitle={`${info?.online ?? 0} / 64`}
								value={info?.online ?? 0}
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
								subtitle={`${info?.characters ?? 0} / 3`}
								icon={
									<IconDeviceGamepad size={22} stroke={1.5} />
								}
								value={info?.characters ?? 0}
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
								}).format(info?.economy ?? 0)}
								color="green"
								icon={<IconCash size={22} stroke={1.5} />}
							/>
						</Group>
					</Paper>
				</Grid.Col>
			</Grid>

			<Grid mt={32}>
				<Grid.Col span={8}>
					<Container fluid p={0} ref={ref}>
						<BlogSection />
					</Container>
				</Grid.Col>

				<Grid.Col span={4}>
					<Container p={0}>
						<Paper withBorder radius="md" p="xs" style={{ height: height, overflow: 'hidden', paddingBottom: 48 }}>
              <Title order={3} transform="uppercase">
                Spelare online
              </Title>

							<ScrollArea mt={8} style={{ height: '100%' }}>
								<Table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Namn</th>
                      <th>Ping</th>
                    </tr>
                  </thead>

                  <tbody>{info.players.map((player: IServerListPlayer) => (
                    <tr key={player.id}>
                      <td><Code>{player.id}</Code></td>
                      <td>{player.name}</td>
                      <td>{player.ping}</td>
                    </tr>
                  ))}</tbody>
                </Table>
							</ScrollArea>
						</Paper>
					</Container>
				</Grid.Col>
			</Grid>
		</Container>
	);
};

export default Home;
