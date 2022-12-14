import { AppShell } from "@mantine/core"
import router from "@utils/libs/Router";

const Index = ({ user }: { user: any }) => {

  return (
    <AppShell>

    </AppShell>
  )
}

export default Index;

export async function getServerSideProps({ req, res }: { req: any, res: any }) {
  await router.run(req, res);

  if (!req.user) {
    return {
      redirect: {
        permanent: false,
        destination: "../auth"
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