import { AppShell } from "@mantine/core"
import router from "@utils/libs/Router";
import { IGetServerSideProps } from "@utils/Types";

const Index = ({ user }: { user: any }) => {

  return (
    <AppShell>

    </AppShell>
  )
}

export default Index;

export const getServerSideProps = async ({ req, res }: IGetServerSideProps) => {
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