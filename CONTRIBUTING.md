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
URL it prints, add a node, and type **Shiplab** (or aliases like ship / post / postal)
in the node picker — one **Shiplab** node should appear with Profile, Connector Group,
Connector, Carrier, and Invoice actions. If it is not listed, the build failed or the
`n8n.nodes` paths in `package.json` are wrong.

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
from your machine for normal releases.

1. Make sure `main` is clean, up to date, and has an upstream.
2. Run `pnpm run release`. It lints, builds, prompts for the version bump, regenerates
   the changelog, then commits, tags, and pushes.
3. The pushed tag triggers `.github/workflows/publish.yml`, which publishes to npm.

### npm authentication

This package uses **Trusted Publishing** on npmjs.com for
`@shiplab-eng/n8n-nodes-shiplab`:

- GitHub owner: `shiplab-eng`
- Repository: `n8n-nodes-shiplab`
- Workflow: `publish.yml`
- Allowed action: `npm publish`

Leave the GitHub `NPM_TOKEN` secret unset. The workflow requests an OIDC token and
npm accepts publishes from that workflow only.

After a successful publish, submit the package for verification at
[creators.n8n.io/nodes](https://creators.n8n.io/nodes).
