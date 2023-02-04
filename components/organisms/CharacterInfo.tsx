import {
	Grid,
	Group,
	Paper,
	Skeleton,
	Stack,
	Title,
	Text,
} from "@mantine/core";
import { IconUser } from "@tabler/icons";

const calculateEconomy = (character_info: any) => {
	let cash = 0;
	const bank = character_info?.money?.bank;
	const pInventory = character_info?.inventory;

	for (const index in pInventory) {
		const item = pInventory[index];

		if (item?.name === "cash") {
			cash += item?.amount;
		}
	}

	return {
		bank: Math.floor(bank),
		cash: Math.floor(cash),
		total: Math.floor(bank + cash),
	};
};

const CharacterInfo = ({
	info: character_info,
	isLoading,
}: {
	info: any;
	isLoading: boolean;
}) => {
	return (
		<Grid.Col span={3}>
			<Paper
				withBorder
				radius="md"
				p="xs"
				sx={{ maxHeight: 500, height: 500 }}
			>
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
									Karaktärs ID
								</Text>
								<Text>{character_info?.charinfo?.cid}</Text>
							</Stack>
						</Grid.Col>

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
									Kön
								</Text>
								<Text>
									{character_info?.charinfo?.gender === 0
										? "Man"
										: "Kvinna"}
								</Text>
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
									Nationalitet
								</Text>
								<Text>
									{character_info?.charinfo?.nationality}
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
									Bank
								</Text>
								<Text>
									{Intl.NumberFormat("sv-SE", {
										notation: "compact",
										maximumFractionDigits: 2,
									}).format(
										calculateEconomy(character_info).bank ??
											0
									)}
								</Text>
							</Stack>
						</Grid.Col>

						<Grid.Col span={4}>
							<Stack spacing={4}>
								<Text fz="xs" c="dimmed">
									Kontanter
								</Text>
								<Text>
									{Intl.NumberFormat("sv-SE", {
										notation: "compact",
										maximumFractionDigits: 2,
									}).format(
										calculateEconomy(character_info).cash ??
											0
									)}
								</Text>
							</Stack>
						</Grid.Col>

						<Grid.Col span={4}>
							<Stack spacing={4}>
								<Text fz="xs" c="dimmed">
									Total ekonomi
								</Text>
								<Text>
									{Intl.NumberFormat("sv-SE", {
										notation: "compact",
										maximumFractionDigits: 2,
									}).format(
										calculateEconomy(character_info)
											.total ?? 0
									)}
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

						<Grid.Col span={4}>
							<Stack spacing={4}>
								<Text fz="xs" c="dimmed">
									Jobb
								</Text>
								<Text>
									{character_info?.job?.label ?? "Okänt"}
								</Text>
							</Stack>
						</Grid.Col>

						<Grid.Col span={4}>
							<Stack spacing={4}>
								<Text fz="xs" c="dimmed">
									Grad
								</Text>
								<Text>
									{character_info?.job?.grade?.name ??
										"Okänt"}
								</Text>
							</Stack>
						</Grid.Col>

						<Grid.Col span={4}>
							<Stack spacing={4}>
								<Text fz="xs" c="dimmed">
									Lön
								</Text>
								<Text>
									{character_info?.job?.payment ?? "N/A"}
								</Text>
							</Stack>
						</Grid.Col>
					</Grid>
				</Skeleton>
			</Paper>
		</Grid.Col>
	);
};

export { CharacterInfo };
