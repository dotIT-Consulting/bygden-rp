import { ActionIcon, Button, Center, Container, createStyles, Grid, Group, Text, Title } from "@mantine/core"
import { Navbar } from "@organisms/Navbar";
import { IconChevronDown } from "@tabler/icons";
import { Icons } from "@utils/Icons";
import { ToHex } from "@utils/libs/ToHex";
import { IHomeData, ILinkButton } from "@utils/Types";
import Image from "next/legacy/image";

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
		filter: 'blur(10px)'
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
		position: 'relative',
		margin: '0 auto',
		marginTop: 128
	},

	textShadowing: {
		color: 'white',
		textShadow: '2px 2px 3px rgba(154, 154, 154, 0.7)',
	}
}))

const HomePage = (props: any) => {
	const { classes, theme } = useStyles();

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
							<source src={props.home?.backgroundVideo?.url} type="video/webm" />
						</video>
					</Center>
				</Container>

				<Container className={classes.mainArea} mt={48}>
					{props.home?.logoImage?.url ? (
						<div className={classes.logoImage}>
							<Image
								layout='fill'
								objectFit='contain'
								src={props.home?.logoImage?.url}
								alt='Website logo'
								priority
							/>
						</div>
					) : undefined}
					
					<Title align="center" order={1} className={classes.textShadowing}>
						{props.home.title ?? undefined}
					</Title>

					<Text size="lg" align="center" className={classes.textShadowing}>
						{props.home.subtitle ?? undefined}
					</Text>

					{props.home.buttonLinks ? (
						<Grid mt={16} grow>
							{props.home?.buttonLinks?.map((button: ILinkButton) => {
								const variant = button.buttonStyle?.toLowerCase() as typeof button.buttonStyle;
								return (
									<Grid.Col span={6} key={button.label}>
										<Button
											component='a'
											variant={variant}
											href={button.linkUrl}
											leftIcon={<Icons type={button.buttonIcon} />}
											fullWidth
										>
											{button.label}
										</Button>
									</Grid.Col>
								)
							})}
						</Grid>
					): undefined}

					<div style={{ margin: '0 auto' }}>
						<ActionIcon
							mt={16}
							variant="transparent"
							component="a"
							href="#"
							size={theme.spacing.xl * 2}
							sx={{ 
								color: 'white',
								'& :hover': {
									color: 'black'
								}
							}}
						>
							<IconChevronDown size={64} />
						</ActionIcon>
					</div>
				</Container>
			</section>
		</>
	)
}

export { HomePage };