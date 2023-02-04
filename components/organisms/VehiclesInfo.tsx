import {
	Grid,
	Group,
	Paper,
	Title,
	Skeleton,
	Text,
	createStyles,
	Table,
	ScrollArea,
	Badge,
} from "@mantine/core";
import { IconCar } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
	header: {
		position: "sticky",
		top: 0,
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
		transition: "box-shadow 150ms ease",

		"&::after": {
			content: '""',
			position: "absolute",
			left: 0,
			right: 0,
			bottom: 0,
			borderBottom: `1px solid ${
				theme.colorScheme === "dark"
					? theme.colors.dark[3]
					: theme.colors.gray[2]
			}`,
		},
	},
	capitalizeText: {
		textTransform: "capitalize",
	},
	uppercaseText: {
		textTransform: "uppercase",
	},
	moveDot: {
		"&::before": {
			marginRight: "-2px",
		},
	},
}));

const getPercentage = (current: number, max: number) => {
	return `${(current / max) * 100}%`;
};

const VehiclesInfo = ({
	info,
	isLoading,
}: {
	info: any;
	isLoading: boolean;
}) => {
	const { classes } = useStyles();

	const getVehicleState = (state: number) => {
		switch (state) {
			case 0:
				return (
					<Badge
						variant="dot"
						color="red"
						classNames={{
							root: classes.moveDot,
						}}
					/>
				);
			case 1:
				return (
					<Badge
						variant="dot"
						color="green"
						classNames={{
							root: classes.moveDot,
						}}
					/>
				);
			case 2:
				return (
					<Badge
						variant="dot"
						color="blue"
						classNames={{
							root: classes.moveDot,
						}}
					/>
				);
			default:
				return (
					<Badge
						variant="dot"
						color="orange"
						classNames={{
							root: classes.moveDot,
						}}
					/>
				);
		}
	};

	const rows = info?.map((vehicle: any, index: number) => (
		<tr key={index}>
			<td className={classes.uppercaseText}>
				{vehicle.mods.modelName ?? vehicle.vehicle}
			</td>
			<td>{vehicle.plate}</td>
			<td className={classes.capitalizeText}>{vehicle.garage}</td>
			<td>{`${vehicle.fuel}%`}</td>
			<td>{getPercentage(vehicle.engine, 1000)}</td>
			<td>{getPercentage(vehicle.body, 1000)}</td>
			<td>{getVehicleState(vehicle.state)}</td>
		</tr>
	));

	return (
		<Grid.Col span={3}>
			<Paper
				withBorder
				radius="md"
				p="xs"
				sx={{ maxHeight: 500, height: 500 }}
			>
				<Group mb={8} position="left">
					<IconCar size={24} />
					<Title order={3} transform="uppercase">
						Fordon
					</Title>
				</Group>

				<Skeleton visible={isLoading} height={435}>
					{info?.length === 0 ? (
						<Text>Du äger inga fordon.</Text>
					) : (
						<ScrollArea sx={{ height: 430 }}>
							<Table>
								<thead className={classes.header}>
									<tr>
										<th>Modell</th>
										<th>Nummerplåt</th>
										<th>Garage</th>
										<th>Bränsle</th>
										<th>Motor</th>
										<th>Kaross</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>{rows}</tbody>
							</Table>
						</ScrollArea>
					)}
				</Skeleton>
			</Paper>
		</Grid.Col>
	);
};

export { VehiclesInfo };
