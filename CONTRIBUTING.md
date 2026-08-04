# Contributing

## Prerequisites

- Node.js LTS
- pnpm

## Install and build

```bash
pnpm install
pnpm build
```

## Run against a local n8n

```bash
pnpm dev
```

This starts an n8n instance with the package linked and hot reload enabled. Open the
URL it prints, add a node, and type **Shiplab** in the node picker — the five Shiplab
nodes should be listed. If they are not, the build failed or the `n8n.nodes` paths in
`package.json` are wrong.

Create a **Shiplab API** credential pointing at your API before testing operations.
When n8n runs in Docker and the API runs on the host, set the base URL to
`http://host.docker.internal:8000`.

## Lint

```bash
pnpm lint
pnpm lint:fix
```

CI runs `pnpm lint` and `pnpm build` on every pull request. Both must pass.

## Releasing

Publishing happens from GitHub Actions so the package carries an npm provenance
statement, which n8n requires for verified community nodes. Do not run `npm publish`
directly — `prepublishOnly` blocks it.

1. Make sure `main` is clean, up to date, and has an upstream.
2. Run `pnpm run release`. It lints, builds, prompts for the version bump, regenerates
   the changelog, then commits, tags, and pushes.
3. The pushed tag triggers `.github/workflows/publish.yml`, which publishes to npm.

Before the first release, configure npm authentication once — either Trusted Publishing
on npmjs.com (preferred, no secrets) or an `NPM_TOKEN` repository secret. See the
comments at the top of `publish.yml`.
