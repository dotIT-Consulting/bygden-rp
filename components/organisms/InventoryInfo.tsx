import { ScrollArea, Table, createStyles, Grid, Paper, Group, Skeleton, Title } from "@mantine/core"
import { IconBackpack } from "@tabler/icons";

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

const InventoryInfo = ({ info: inventory, isLoading} : { info: any, isLoading: boolean }) => {
  const { classes } = useStyles();

	const rows = inventory?.map((item: any, index: number) => (
		<tr key={index}>
			<td>{item.label}</td>
			<td>{item.amount}</td>
			<td>{getExtraInfo(item)}</td>
		</tr>
	));


  return (
    <Grid.Col span={3}>
				<Paper withBorder radius="md" p="xs" sx={{ maxHeight: 500, height: 500 }}>
					<Group mb={8} position="left">
						<IconBackpack size={24} />
						<Title order={3} transform="uppercase">
							Föremål
						</Title>
					</Group>

					<Skeleton visible={isLoading} height={435}>
            <ScrollArea offsetScrollbars type="scroll" sx={{
              height: 430
            }}>
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
  )
}

export { InventoryInfo }