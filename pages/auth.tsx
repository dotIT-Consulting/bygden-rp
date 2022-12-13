import { Button, Card, Center, Container, Text, Title } from "@mantine/core"
import { IconBrandSteam } from "@tabler/icons";
import router from "@utils/libs/Router";

const Auth = ({ user }: { user: any }) => {

  return (
    <Container mt="20vh">
      <Card>
        <Title order={3} align="center">Du behöver först logga in</Title>

        <Center mt={32} mb={32}>
          <Button variant="outline" rightIcon={<IconBrandSteam />} component='a' href="../api/auth/login">
            Logga in med Steam
          </Button>
        </Center>

        <Text italic align="center" size="sm" color="dimmed" mb={8}>
          Notera: du kommer att skickas till Steams officiella hemsida för att logga in.{<br />}
          Vi hanterar ej dina inloggningsuppgifter och vi är inte affilieratde med Steam eller Valve.
        </Text>
      </Card>
    </Container>
  )
}

export default Auth;

export async function getServerSideProps({ req, res }: { req: any, res: any }) {
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