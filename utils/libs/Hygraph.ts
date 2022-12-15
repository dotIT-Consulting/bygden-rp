import { GraphQLClient } from 'graphql-request';

const HYGRAPH_URL = process.env.HYGRAPH_URL ?? ''
const Hygraph = new GraphQLClient(HYGRAPH_URL);

export { Hygraph };