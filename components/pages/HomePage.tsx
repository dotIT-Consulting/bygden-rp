import {
	ActionIcon,
	Button,
	Center,
	Container,
	createStyles,
	Grid,
	Group,
	Paper,
	Text,
	Title,
	TypographyStylesProvider,
} from "@mantine/core";
import { DashRing } from "@atoms/DashRing";
import { useScrollIntoView } from "@mantine/hooks";
import { Navbar } from "@organisms/Navbar";
import { IconCash, IconChevronDown, IconUsers } from "@tabler/icons";
import { Icons } from "@utils/Icons";
import { ILinkButton } from "@utils/Types";
import Image from "next/legacy/image";
import useSWR from "swr";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { AdminsSlider } from "@organisms/Admins";

const useStyles = createStyles((theme) => ({
	videoContainer: {
		position: "relative",
		marginTop: -60,
		width: "100%",
		height: "100vh",
		overflow: "hidden",
		zIndex: -1,
	},

	videoPlayer: {
		minWidth: "100%",
		minHeight: "100%",
		width: "auto",
		height: "auto",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		filter: "blur(10px)",
	},

	mainArea: {
		position: "absolute",
		left: "50%",
		transform: "translate(-50%, -50%)",
		top: "30vh",
		display: "flex",
		justifyContent: "space-between",
		flexDirection: "column",
	},

	logoImage: {
		width: 256,
		height: 256,
		position: "relative",
		margin: "0 auto",
		marginTop: 128,
	},

	textShadowing: {
		color: "white",
		textShadow: "2px 2px 3px rgba(154, 154, 154, 0.7)",
	},

	description: {
		color: 'white',
		maxWidth: '70%',
		paddingBottom: 1,
		[theme.fn.smallerThan("sm")]: {
			maxWidth: '100%'
		}
	}
}));

const HomePage = (props: any) => {
	const { classes, theme } = useStyles();
	const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

	const { data: info } = useSWR(`/api/bygden/basic-info`, {
		refreshInterval: 60 * 1000,
	});
	const { data: time_stats } = useSWR(`/api/bygden/fetch-player-stats`);

	return (
		<>
			<nav>
				<Navbar {...props.navbar} />
			</nav>
			<section>
				<Container fluid className={classes.videoContainer}>
					<Center>
						<video
							muted
							disablePictureInPicture
							autoPlay
							loop
							className={classes.videoPlayer}
						>
							<source
								src={props.home?.backgroundVideo?.url}
								type="video/webm"
							/>
						</video>
					</Center>
				</Container>

				<Container className={classes.mainArea} mt={48}>
					{props.home?.logoImage?.url ? (
						<div className={classes.logoImage}>
							<Image
								layout="fill"
								objectFit="contain"
								src={props.home?.logoImage?.url}
								alt="Website logo"
								priority
							/>
						</div>
					) : undefined}

					<Title
						align="center"
						order={1}
						className={classes.textShadowing}
					>
						{props.home.title ?? undefined}
					</Title>

					<Text
						size="lg"
						align="center"
						className={classes.textShadowing}
					>
						{props.home.subtitle ?? undefined}
					</Text>

					{props.home.buttonLinks ? (
						<Grid mt={16} grow>
							{props.home?.buttonLinks?.map(
								(button: ILinkButton) => {
									const variant =
										button.buttonStyle?.toLowerCase() as typeof button.buttonStyle;
									return (
										<Grid.Col span={6} key={button.label}>
											<Button
												component="a"
												variant={variant}
												href={button.linkUrl}
												leftIcon={
													<Icons
														type={button.buttonIcon}
													/>
												}
												fullWidth
											>
												{button.label}
											</Button>
										</Grid.Col>
									);
								}
							)}
						</Grid>
					) : undefined}

					<div style={{ margin: "0 auto" }}>
						<ActionIcon
							mt={16}
							variant="transparent"
							component="a"
							size={theme.spacing.xl * 2}
							onClick={() =>
								scrollIntoView({ alignment: "start" })
							}
							sx={{
								color: "white",
								"& :hover": {
									color: "black",
								},
							}}
						>
							<IconChevronDown size={64} />
						</ActionIcon>
					</div>
				</Container>
			</section>

			<main ref={targetRef}>
				<Container mt={32} size="xl" pb={32}>
					<Title order={1} mb={16} transform="uppercase">
						Filosofin
					</Title>

					<TypographyStylesProvider className={ classes.description }>
						<div dangerouslySetInnerHTML={{ __html: props?.home?.description?.html }} />
					</TypographyStylesProvider>

					<Title order={1} mt={32} mb={16} transform="uppercase">
						Möt teamet
					</Title>

					<AdminsSlider />

					<Title order={1} mb={16} transform="uppercase">
						Statistik
					</Title>
					<Grid>
						<Grid.Col span={6}>
							<Paper withBorder radius="md" p="xs">
								<Group>
									<DashRing
										title="SPELARE ONLINE"
										subtitle={`${info?.online ?? 0} / ${
											info?.max_slots ?? 0
										}`}
										value={info?.online ?? 0}
										maxValue={info?.max_slots ?? 0}
										icon={
											<IconUsers size={22} stroke={1.5} />
										}
									/>
								</Group>
							</Paper>
						</Grid.Col>

						<Grid.Col span={6}>
							<Paper withBorder radius="md" p="xs">
								<Group>
									<DashRing
										title="TOTAL EKONOMI"
										subtitle={Intl.NumberFormat("sv-SE", {
											notation: "compact",
											maximumFractionDigits: 1,
										}).format(info?.economy ?? 0)}
										color="green"
										icon={
											<IconCash size={22} stroke={1.5} />
										}
									/>
								</Group>
							</Paper>
						</Grid.Col>
					</Grid>

					<Container fluid p={0} mt={32}>
						<Paper
							withBorder
							radius="md"
							p="xs"
							sx={{ height: "43vh", overflow: "hidden" }}
						>
							<Title order={3} transform="uppercase">
								Spelar aktivitet (24h)
							</Title>

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
											backgroundColor:
												theme.colors.dark[7],
										}}
										wrapperStyle={{
											border: `1px solid ${theme.colors.dark[8]}`,
											borderRadius: 5,
										}}
										labelStyle={{ color: "white" }}
										labelFormatter={(value) => [
											`Klockan ${value}`,
										]}
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
			</main>
		</>
	);
};

export { HomePage };
