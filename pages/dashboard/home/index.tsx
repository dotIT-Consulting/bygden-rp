import { DashRing } from "@atoms/DashRing";
import {
	Code,
	Container,
	Grid,
	Group,
	Paper,
	ScrollArea,
	Table,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { BlogSection } from "@molecules/BlogSection";
import { IconCash, IconDeviceGamepad, IconUsers } from "@tabler/icons";
import { IServerListPlayer, ISteamProps } from "@utils/Types";
import useSWR from "swr";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const data = [
	{
		name: "00:00",
		players: 0,
	},
	{
		name: "01:00",
		players: 2,
	},
	{
		name: "02:00",
		players: 3,
	},
	{
		name: "03:00",
		players: 3,
	},
	{
		name: "04:00",
		players: 4,
	},
	{
		name: "05:00",
		players: 6,
	},
	{
		name: "06:00",
		players: 4,
	},
	{
		name: "07:00",
		players: 2,
	},
	{
		name: "08:00",
		players: 3,
	},
	{
		name: "09:00",
		players: 4,
	},
	{
		name: "10:00",
		players: 5,
	},
	{
		name: "11:00",
		players: 7,
	},
	{
		name: "12:00",
		players: 12,
	},
	{
		name: "13:00",
		players: 14,
	},
	{
		name: "14:00",
		players: 15,
	},
	{
		name: "15:00",
		players: 18,
	},
	{
		name: "16:00",
		players: 24,
	},
	{
		name: "17:00",
		players: 31,
	},
	{
		name: "18:00",
		players: 44,
	},
	{
		name: "19:00",
		players: 64,
	},
	{
		name: "20:00",
		players: 64,
	},
	{
		name: "21:00",
		players: 64,
	},
	{
		name: "22:00",
		players: 64,
	},
	{
		name: "23:00",
		players: 64,
	},
	{
		name: "24:00",
		players: 64,
	},
];

const Home = (props: ISteamProps) => {
	const { user: steam } = props.steam;
	const { ref, height } = useElementSize();
	const theme = useMantineTheme();

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
						<Paper
							withBorder
							radius="md"
							p="xs"
							style={{
								height: height,
								overflow: "hidden",
								paddingBottom: 48,
							}}
						>
							<Title order={3} transform="uppercase">
								Spelare online
							</Title>

							<ScrollArea mt={8} style={{ height: "100%" }}>
								<Table>
									<thead>
										<tr>
											<th>ID</th>
											<th>Namn</th>
											<th>Ping</th>
										</tr>
									</thead>

									<tbody>
										{info?.players?.map(
											(player: IServerListPlayer) => (
												<tr key={player.id}>
													<td>
														<Code>{player.id}</Code>
													</td>
													<td>{player.name}</td>
													<td>{player.ping}</td>
												</tr>
											)
										)}
									</tbody>
								</Table>
							</ScrollArea>
						</Paper>
					</Container>
				</Grid.Col>
			</Grid>

			<Container fluid p={0} mt={32}>
				<Paper withBorder radius="md" p="xs" sx={{ height: '43vh' }}>
					<Title order={3} transform="uppercase">
						Server statisitk (24h)
					</Title>

					<ResponsiveContainer width="100%" height="100%">
						<LineChart
							data={data}
							margin={{ top: 32, right: 8, left: -32, bottom: 32 }}
						>
							<CartesianGrid
								stroke={theme.colors.dark[3]}
								vertical={false}
							/>
							<XAxis dataKey="name" />
							<YAxis domain={[0, 64]} />
							<Tooltip
								formatter={(value) => [
									`${value}st`,
									"Spelare online",
								]}
								contentStyle={{
									backgroundColor: theme.colors.dark[7],
								}}
								wrapperStyle={{
									border: `1px solid ${theme.colors.dark[8]}`,
									borderRadius: 5,
								}}
								labelStyle={{ color: "white" }}
							/>
							<Line
								type="monotone"
								dataKey="players"
								stroke={theme.colors.orange[4]}
								activeDot={{ r: 8 }}
								strokeWidth={4}
							/>
						</LineChart>
					</ResponsiveContainer>
				</Paper>
			</Container>
		</Container>
	);
};

export default Home;
