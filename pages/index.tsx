import { HomePage } from "@pages/HomePage";
import { Hygraph } from "@utils/libs/Hygraph";
import { IHomeData } from "@utils/Types";

const IndexPage = ({ pageProps }: { pageProps: IHomeData }) => {
  return <HomePage {...pageProps}/>
}

export default IndexPage;

export const getServerSideProps = async () => {
  const { landingPages, navbars } = await Hygraph.request(`
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

    navbars(last: 1) {
      logoImage {
        url
      }
      title
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

  const navbar = navbars.pop();
  const home = landingPages.pop();

  return {
    props: {
      home,
      navbar
    }
  }
}