import router from "@utils/libs/Router";
import { IGetServerSideProps } from "@utils/Types";

const Index = () => {
  return (
    <p>Loading...</p>
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
    redirect: {
      permanent: true,
      destination: "/dashboard/home"
    },
    props: {
      user: req.user || null
    }
  };
}