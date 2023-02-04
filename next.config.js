const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media.graphassets.com'],
  },
  sentry: {
    hideSourceMaps: false,
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};


//module.exports = moduleExports;
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);