## Setup

CLI:

```sh
# Install dependencies.
pnpm install

# Generate gql.tada types.
pnpm gen
```

IDE:

- VSCode `v1.88.1`
- VSCode Extension: [GraphQL.vscode-graphql](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) `v0.9.3`

## Repro

1. Open this repo in VSCode
2. Open `src/index.ts`
3. Wait a few seconds for the GraphQL LSP to kick in and (unexpectedly) check the embedded GraphQL code.

Expected:

- No issues; GraphQL LSP should not be validating the embedded code in this `.ts` file.

Actual:

- GraphQL LSP validates the embedded GraphQL code in `index.ts`, and flags two (false) errors:
  - `Unknown directive "@_unmask".`
  - `Unknown fragment "MyRepoFragment".`

## Notes

Seems like this may be an issue in the GraphQL LSP. It's unexpected that `index.ts` is validated, even though that file should not pass the `"documents"` glob specified in `.graphqlrc`.

When opening/editing `index.ts`, GraphQL Language Server will log the following output:

```
{"type":"usage","messageType":"textDocument/didOpenOrSave","projectName":"default","fileName":"file:///path-to-repo/src/index.ts"}
{"type":"usage","messageType":"textDocument/documentSymbol","fileName":"file:///path-to-repo/src/index.ts"}
```

This further indicates that the LSP is running on this file.

PS: In the current setup, the extension will also log an error stating that no type definitions (i.e. `src/**/*.graphql` files) were found. The presence or absence of dedicated query files does not seem to have an impact on the unexpected validation of `index.ts`. The same issue is also present when `"documents"` in `.graphqlrc` is set to `[]`.
