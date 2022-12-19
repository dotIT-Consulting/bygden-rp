import {
	Code,
	Container,
	Grid,
	Group,
	Paper,
	ScrollArea,
	Select,
	Table,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { BlogSection } from "@molecules/BlogSection";
import { IServerListPlayer, ISteamProps } from "@utils/Types";
import useSWR from "swr";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { DashInfo } from "@molecules/DashInfo";

const data = [
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
		players: 46,
	},
	{
		name: "19:00",
		players: 42,
	},
	{
		name: "20:00",
		players: 44,
	},
	{
		name: "21:00",
		players: 46,
	},
	{
		name: "22:00",
		players: 45,
	},
	{
		name: "23:00",
		players: 46,
	},
	{
		name: "00:00",
		players: 49,
	},
];

const Home = (props: ISteamProps) => {
	const { user: steam } = props.steam;
	const { ref, height } = useElementSize();
	const [interval, setInterval] = useState<string>("24h");
	const theme = useMantineTheme();

	const { data: time_stats } = useSWR(
		`/api/bygden/fetch-player-stats?interval=${interval}`,
		{
			revalidateOnFocus: false,
		}
	);
	const { data: info } = useSWR(
		`/api/bygden/basic-info?license=${steam.fivemLicenseFormat}`,
		{
			refreshInterval: 60 * 1000,
		}
	);

	return (
		<Container fluid>
			<Grid>
				<DashInfo serverInfo={info} />
			</Grid>

			<Grid mt={24}>
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

							<ScrollArea
								mt={8}
								style={{ height: "100%" }}
								type="always"
								offsetScrollbars
							>
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
													<td>{player.ping}ms</td>
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
				<Paper withBorder radius="md" p="xs" sx={{ height: "43vh" }}>
					<Group position="apart">
						<Title order={3} transform="uppercase">
							Spelar statisitk ({interval})
						</Title>

						<Select
							placeholder="Välj tids intervall"
							defaultValue={"24h"}
							data={[
								{ value: "24h", label: "24 timmar" },
								{ value: "1w", label: "1 vecka" },
								{ value: "1m", label: "1 månad" },
							]}
							onChange={async (value: string) => {
								setInterval(value);
							}}
						/>
					</Group>

					<ResponsiveContainer width="100%" height="100%">
						<LineChart
							data={time_stats?.stats}
							margin={{
								top: 32,
								right: 8,
								left: -32,
								bottom: 32,
							}}
						>
							<CartesianGrid
								stroke={theme.colors.dark[3]}
								vertical={false}
							/>
							<XAxis dataKey="hour" />
							<YAxis domain={[0, info?.max_slots ?? 0]} />
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
								dataKey="online"
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
