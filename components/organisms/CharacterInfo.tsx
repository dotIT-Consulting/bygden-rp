import {
	Grid,
	Group,
	Paper,
	Skeleton,
	Stack,
	Title,
	Text,
	Divider,
	Table,
	ScrollArea,
	createStyles,
} from "@mantine/core";
import { IconUser } from "@tabler/icons";

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
}));

const getExtraInfo = (item: any) => {
	switch (item.name) {
		case "vehiclekey":
			return `${item.info.plate} | ${item.info.model}`;

		case "phone":
			return `${item.info.lbPhoneNumber}`;

		case "id_card":
			return `${item.info.firstname} ${item.info.lastname} | ${item.info.birthdate}`;

		default:
			return "N/A";
	}
};

const CharacterInfo = ({
	info: character_info,
	isLoading,
}: {
	info: any;
	isLoading: boolean;
}) => {
	const { classes } = useStyles();

	const rows = character_info?.inventory?.map((item: any, index: number) => (
		<tr key={index}>
			<td>{item.label}</td>
			<td>{item.amount}</td>
			<td>{getExtraInfo(item)}</td>
		</tr>
	));

	return (
		<Grid.Col span={4}>
			<Paper withBorder radius="md" p="xs" sx={{ maxHeight: 500, height: 500 }}>
				<Group mb={8} position="left">
					<IconUser size={24} />
					<Title order={3} transform="uppercase">
						Info
					</Title>
				</Group>

				<Skeleton visible={isLoading} height={435}>
					<Grid grow>
						<Grid.Col span={4}>
							<Stack spacing={4}>
								<Text fz="xs" c="dimmed">
									Namn
								</Text>
								<Text>{`${character_info?.charinfo?.firstname} ${character_info?.charinfo?.lastname}`}</Text>
							</Stack>
						</Grid.Col>

						<Grid.Col span={4}>
							<Stack spacing={4}>
								<Text fz="xs" c="dimmed">
									Födelsedag
								</Text>
								<Text>
									{character_info?.charinfo?.birthdate}
								</Text>
							</Stack>
						</Grid.Col>

						<Grid.Col span={4}>
							<Stack spacing={4}>
								<Text fz="xs" c="dimmed">
									Blodtyp
								</Text>
								<Text>
									{character_info?.metadata?.bloodtype ??
										"Okänt"}
								</Text>
							</Stack>
						</Grid.Col>

						<Grid.Col span={4}>
							<Stack spacing={4}>
								<Text fz="xs" c="dimmed">
									Törst
								</Text>
								<Text>
									{`${character_info?.metadata?.thirst}%` ??
										"Okänt"}
								</Text>
							</Stack>
						</Grid.Col>

						<Grid.Col span={4}>
							<Stack spacing={4}>
								<Text fz="xs" c="dimmed">
									Hunger
								</Text>
								<Text>
									{`${character_info?.metadata?.hunger}%` ??
										"Okänt"}
								</Text>
							</Stack>
						</Grid.Col>

						<Grid.Col span={4}>
							<Stack spacing={4}>
								<Text fz="xs" c="dimmed">
									Stress
								</Text>
								<Text>
									{`${character_info?.metadata?.stress}%` ??
										"Okänt"}
								</Text>
							</Stack>
						</Grid.Col>

						<Grid.Col span={4}>
							<Stack spacing={4}>
								<Text fz="xs" c="dimmed">
									Avliden
								</Text>
								<Text>
									{character_info?.metadata?.isdead
										? "Ja"
										: "Nej"}
								</Text>
							</Stack>
						</Grid.Col>

						<Grid.Col span={4}>
							<Stack spacing={4}>
								<Text fz="xs" c="dimmed">
									Utslagen
								</Text>
								<Text>
									{character_info?.metadata?.last_stand
										? "Ja"
										: "Nej"}
								</Text>
							</Stack>
						</Grid.Col>

						<Grid.Col span={4}>
							<Stack spacing={4}>
								<Text fz="xs" c="dimmed">
									Fängslad
								</Text>
								<Text>
									{character_info?.metadata?.injail
										? "Ja"
										: "Nej"}
								</Text>
							</Stack>
						</Grid.Col>
					</Grid>

					<Divider mt={16} mb={16} />

					<ScrollArea
						type="never"
						sx={{
							height: 250,
							paddingBottom: 32
						}}
					>
						<Table>
							<thead className={classes.header}>
								<tr>
									<th>Föremål</th>
									<th>Antal</th>
									<th>Extra</th>
								</tr>
							</thead>
							<tbody>{rows}</tbody>
						</Table>
					</ScrollArea>
				</Skeleton>
			</Paper>
		</Grid.Col>
	);
};

export { CharacterInfo };
