import { HomePage } from "@pages/HomePage";
import { Hygraph } from "@utils/libs/Hygraph";
import { IHomeData } from "@utils/Types";
import router from "@utils/libs/Router";

const IndexPage = ({ pageProps, user }: { pageProps: IHomeData, user: any }) => {
  return <HomePage pageProps={pageProps} user={user} />
}

export default IndexPage;

export async function getServerSideProps({ req, res }: { req: any, res: any }) {
  await router.run(req, res)

  const { landingPages } = await Hygraph.request(`
  {
    landingPages(last: 1) {
      logoImage {
        url
      }
      backgroundVideo {
        url
      }
      title
      subtitle
      buttonLinks {
        ... on ButtonLink {
          label
          linkUrl
          buttonIcon
          buttonStyle
        }
      }
    }
  }
  `)

  const pageProps = landingPages.pop();

  return {
    props: {
      pageProps,
      user: req.user || null
    }
  }
}