import {
	Code,
	Container,
	Grid,
	Group,
	Paper,
	ScrollArea,
	Select,
	Skeleton,
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
import { Hygraph } from "@utils/libs/Hygraph";
import { IconGraph, IconUsers } from "@tabler/icons";

export async function getServerSideProps() {
  const { blogPosts } = await Hygraph.request(`
    {
      blogPosts {
        createdAt
        blog {
					type
          blogTitle
          blogSlug
          blogImage {
            url
          }
        }
        author {
          authorName
          authorPicture {
            url
          }
        }
      }
    }
  `)

  return {
    props: {
      blogPosts
    }
  };
}

const Home = (props: ISteamProps) => {
	//@ts-ignore
	const { blogPosts } = props.pageProps;
	const { user: steam } = props.steam;
	const { ref, height } = useElementSize();
	const [interval, setInterval] = useState<string>("24h");
	const theme = useMantineTheme();

	const { data: time_stats } = useSWR(
		`/api/bygden/fetch-player-stats?interval=${interval}`
	);
	const { data: info, isLoading } = useSWR(
		`/api/bygden/basic-info?license=${steam.fivemLicenseFormat}`,
		{
			refreshInterval: 60 * 1000,
		}
	);

	return (
		<Container fluid>
			<Grid>
				<DashInfo serverInfo={info} isLoading={isLoading} />
			</Grid>

			<Grid mt={24}>
				<Grid.Col span={8}>
					<Container fluid p={0} ref={ref}>
						<BlogSection posts={blogPosts} />
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
							<Group mb={8} position="left">
								<IconUsers size={24} />
								<Title order={3} transform="uppercase">
									Spelare online
								</Title>
							</Group>


							<ScrollArea
								mt={8}
								style={{ height: "100%" }}
								type="always"
								offsetScrollbars
							>
								<Skeleton visible={isLoading}>
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
								</Skeleton>
							</ScrollArea>
						</Paper>
					</Container>
				</Grid.Col>
			</Grid>

			<Container fluid p={0} mt={32}>
				<Paper withBorder radius="md" p="xs" sx={{ height: "43vh" }}>
					<Group position="apart">
						<Group mb={8} position="left">
							<IconGraph size={32} />
							<Title order={3} transform="uppercase">
							Spelar statistik ({interval})
							</Title>
						</Group>

						<Select
							placeholder="Välj tids intervall"
							defaultValue={"24h"}
							data={[
								{ value: "24h", label: "24 timmar" },
								{ value: "1w", label: "1 vecka" },
								{ value: "1m", label: "1 månad" },
							]}
							onChange={(value: string) => {
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
								labelFormatter={(value) => [`Klockan ${value}`]}
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
