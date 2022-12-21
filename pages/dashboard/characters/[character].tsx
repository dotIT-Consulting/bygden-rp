import {
	Container,
	Grid,
	Group,
	Paper,
	Skeleton,
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

const parseJSON = (json: any) => {
  if (typeof json !== 'string') {
    return []
  }

  try {
    const parsed = JSON.parse(json)
    return parsed
  } catch (error) {
    return json;
  }
}

const Character = ({ pageProps: { id } }: { pageProps: { id: string } }) => {
	const { data, isLoading } = useSWR(`/api/bygden/fetch-character-data?citizenid=${id}`);
	const character = data?.character;

	const charInfo = parseJSON(character?.charinfo);

	return (
		<Container fluid>
			<Grid>
				<Grid.Col span={4}>
					<Paper withBorder radius="md" p="xs">
						<Group mb={8} position="left">
							<IconUser size={24} />
							<Title order={3} transform="uppercase">
								info
							</Title>
						</Group>

            <Skeleton visible={isLoading}>
              <Grid grow>
                <Grid.Col span={4}>
                  <Stack spacing={4}>
                    <Text fz="xs" c="dimmed">
                      Namn
                    </Text>
                    <Text>{`${charInfo.firstname} ${charInfo.lastname}`}</Text>
                  </Stack>
                </Grid.Col>

                <Grid.Col span={4}>
                  <Stack spacing={4}>
                    <Text fz="xs" c="dimmed">
                      Telefon
                    </Text>
                    <Text>{charInfo.phone ?? 'Okänt'}</Text>
                  </Stack>
                </Grid.Col>

                <Grid.Col span={4}>
                  <Stack spacing={4}>
                    <Text fz="xs" c="dimmed">
                      Födelsedag
                    </Text>
                    <Text>{charInfo.birthdate}</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Skeleton>
					</Paper>
				</Grid.Col>

				<Grid.Col span={4}>
					<Paper withBorder radius="md" p="xs">
						<Group mb={8} position="left">
							<IconCash size={24} />
							<Title order={3} transform="uppercase">
								tillgångar
							</Title>
						</Group>

            <Skeleton visible={isLoading}>
              <Grid grow>
                <Grid.Col span={4}>
                  <Stack spacing={4}>
                    <Text fz="xs" c="dimmed">
                      Namn
                    </Text>
                    <Text>{`${charInfo.firstname} ${charInfo.lastname}`}</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Skeleton>
					</Paper>
				</Grid.Col>

				<Grid.Col span={4}>
					<Paper withBorder radius="md" p="xs">
						<Group mb={8} position="left">
							<IconChartAreaLine size={24} />
							<Title order={3} transform="uppercase">
								statistik
							</Title>
						</Group>

            <Skeleton visible={isLoading}>
              <Grid grow>
                <Grid.Col span={4}>
                  <Stack spacing={4}>
                    <Text fz="xs" c="dimmed">
                      Namn
                    </Text>
                    <Text>{`${charInfo.firstname} ${charInfo.lastname}`}</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Skeleton>
					</Paper>
				</Grid.Col>
			</Grid>
		</Container>
	);
};

export default Character;
