import { initGraphQLTada } from "gql.tada";
import { introspection } from "./generated/graphql-env.js";

export const graphql = initGraphQLTada<{
  introspection: introspection;
  scalars: { ID: `${number}` };
}>();

export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
export { readFragment } from "gql.tada";
