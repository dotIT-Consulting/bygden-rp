import { GraphQLClient } from 'graphql-request';

const Hygraph = new GraphQLClient(process.env.HYGRAPH_URL ?? 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clbke8bcn2v6i01uf67rr5m6k/master');

export { Hygraph };