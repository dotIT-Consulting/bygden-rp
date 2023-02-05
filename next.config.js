const { withSentryConfig } = require('@sentry/nextjs');
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media.graphassets.com'],
  },
  sentry: {
    hideSourceMaps: true,
  },
  devtool: "source-map", // Source map generation must be turned on
  plugins: [
    new SentryWebpackPlugin({
      org: "dotit-ro",
      project: "bygden-rp",

      // Specify the directory containing build artifacts
      include: "./dist",

      // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
      // and needs the `project:releases` and `org:read` scopes
      authToken: process.env.SENTRY_AUTH_TOKEN,

      // Optionally uncomment the line below to override automatic release name detection
      // release: process.env.RELEASE,
    }),
  ],
};

const sentryWebpackPluginOptions = {
  silent: true,
};


//module.exports = moduleExports;
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);