import { HomePage } from "@pages/HomePage";
import { Hygraph } from "@utils/libs/Hygraph";
import { IGetServerSideProps, IHomeData } from "@utils/Types";

const IndexPage = ({ pageProps }: { pageProps: IHomeData }) => {
  return <HomePage pageProps={pageProps}/>
}

export default IndexPage;

export const getServerSideProps = async () => {
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
      pageProps
    }
  }
}