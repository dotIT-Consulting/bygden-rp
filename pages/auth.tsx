import { Button, Center, Container, Paper, Text, Title } from "@mantine/core"
import { IconBrandSteam } from "@tabler/icons";
import router from "@utils/libs/Router";
import { IGetServerSideProps } from "@utils/Types";

const Auth = () => {
  return (
    <Container mt="20vh">
      <Paper withBorder radius="md" p="xs">
        <Title order={3} align="center">Du behöver först logga in</Title>

        <Center mt={32} mb={32}>
          <Button variant="outline" rightIcon={<IconBrandSteam />} component='a' href="../api/auth/login">
            Logga in med Steam
          </Button>
        </Center>

        <Text italic align="center" size="sm" color="dimmed" mb={8}>
          Notera: du kommer att skickas till Steams officiella hemsida för att logga in.{<br />}
          Vi hanterar ej dina inloggningsuppgifter och vi är inte affilierad med Valve på något vis.
        </Text>
      </Paper>
    </Container>
  )
}

export default Auth;

export const getServerSideProps = async ({ req, res }: IGetServerSideProps) => {
  await router.run(req, res);

  if (req.user) {
    return {
      redirect: {
        permanent: false,
        destination: "../dashboard"
      },
      props: {
        user: req.user || null
      }
    }
  }

  return {
    props: {
      user: req.user || null
    }
  };
}