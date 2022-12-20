import {
	Container,
	Grid,
	Group,
	Paper,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { IconCash, IconChartAreaLine, IconUser } from "@tabler/icons";
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
	const { data } = useSWR(`/api/bygden/fetch-character-data?citizenid=${id}`);
	const character = data?.character;

	const charInfo = JSON.parse(character?.charinfo);

	return (
		<Container fluid>
			<Grid>
				<Grid.Col span={4}>
					<Paper withBorder radius="md" p="xs">
						<Group position="left">
							<IconUser size={24} />
							<Title order={3} transform="uppercase">
								info
							</Title>
						</Group>

            <Grid grow>
              <Grid.Col span={4}>
                <Stack spacing={4} mt={8}>
                  <Text fz="xs" c="dimmed">
                    Namn
                  </Text>
                  <Text>{`${charInfo.firstname} ${charInfo.lastname}`}</Text>
                </Stack>
              </Grid.Col>

              <Grid.Col span={4}>
                <Stack spacing={4} mt={8}>
                  <Text fz="xs" c="dimmed">
                    Telefon
                  </Text>
                  <Text>{charInfo.phone ?? 'Okänt'}</Text>
                </Stack>
              </Grid.Col>

              <Grid.Col span={4}>
                <Stack spacing={4} mt={8}>
                  <Text fz="xs" c="dimmed">
                    Födelsedag
                  </Text>
                  <Text>{charInfo.birthdate}</Text>
                </Stack>
              </Grid.Col>
            </Grid>
					</Paper>
				</Grid.Col>

				<Grid.Col span={4}>
					<Paper withBorder radius="md" p="xs">
						<Group position="left">
							<IconCash size={24} />
							<Title order={3} transform="uppercase">
								tillgångar
							</Title>
						</Group>

            <Grid grow>
              <Grid.Col span={4}>
                <Stack spacing={4} mt={8}>
                  <Text fz="xs" c="dimmed">
                    Namn
                  </Text>
                  <Text>{`${charInfo.firstname} ${charInfo.lastname}`}</Text>
                </Stack>
              </Grid.Col>
            </Grid>
					</Paper>
				</Grid.Col>

				<Grid.Col span={4}>
					<Paper withBorder radius="md" p="xs">
						<Group position="left">
							<IconChartAreaLine size={24} />
							<Title order={3} transform="uppercase">
								statistik
							</Title>
						</Group>
					</Paper>
				</Grid.Col>
			</Grid>
		</Container>
	);
};

export default Character;
