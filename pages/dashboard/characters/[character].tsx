import { Container, Divider, Grid, Paper } from "@mantine/core";
import { CharacterInfo } from "@organisms/CharacterInfo";
import { HousesInfo } from "@organisms/HousesInfo";
import { InventoryInfo } from "@organisms/InventoryInfo";
import { VehiclesInfo } from "@organisms/VehiclesInfo";
import useSWR from "swr";

export async function getServerSideProps({ params }: any) {
	const { character: charId } = params;

	return {
		props: {
			id: charId,
		},
	};
}
const Character = ({ pageProps: { id } }: { pageProps: { id: string } }) => {
	const { data, isLoading } = useSWR(
		`/api/bygden/fetch-character-data?citizenid=${id}`
	);

	return (
		<Container fluid>
			<Grid>
				<CharacterInfo info={data?.character_info} isLoading={isLoading} />
				<InventoryInfo info={data?.character_info?.inventory} isLoading={isLoading} />
				<VehiclesInfo info={data?.vehicles} isLoading={isLoading} />
        <HousesInfo info={data?.houses} isLoading={isLoading} />
			</Grid>

			<Divider mt={16} mb={16} />

			<Paper withBorder radius="md" p="xs" sx={{ height: 500 }}>

			</Paper>
		</Container>
	);
};

export default Character;
