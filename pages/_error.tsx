import * as Sentry from '@sentry/nextjs';
import { NextPageContext } from 'next';
import NextErrorComponent from 'next/error';

const CustomErrorComponent = (props: { statusCode: any; }) => {
  return <NextErrorComponent statusCode={props.statusCode} />;
};

CustomErrorComponent.getInitialProps = async (contextData: NextPageContext) => {
  await Sentry.captureUnderscoreErrorException(contextData);
  
  return NextErrorComponent.getInitialProps(contextData);
};

export default CustomErrorComponent;
