import { graphql } from "./api.js";

/**
 * Fragment example using gql.tada's `@_unmask` directive.
 * The below is valid for gql.tada, but the GraphQL LSP takes issue with it.
 *
 * Expected: No errors
 * Actual: `[GraphQL: Validation] Unknown directive "@_unmask".`
 */
const MyRepoFragment = graphql(`
  fragment MyRepoFragment on Repository @_unmask {
    name
  }
`);

/**
 * Query example using a fragment.
 * The below is valid for gql.tada, but the GraphQL LSP takes issue with it.
 *
 * Expected: No errors
 * Actual: `[GraphQL: Validation] Unknown fragment "MyRepoFragment".`
 */
const MyRepo = graphql(
  `
    query MyRepo($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        url
        ...MyRepoFragment
      }
    }
  `,
  [MyRepoFragment]
);
