# NEAR Visualizer

### Live Demo: https://near-visualizer.vercel.app/

The visual blockchain explorer for NEAR

A submission for the NEAR Metabuid Hackathon

## Intro

NEAR is a fast, scalable, carbon-neutral blockchain. With sharding, NEAR is capable of processing in the order of hundreds of thousands of transactions per second.

- How can developers, teams, and DAOs sort through millions of transactions to find trends and patterns?

- How can we understand NEAR data in context to create new features, Dapps or governance proposals?

With NEAR Visualizer, **you can understand key trends with just a glance.**

You can also explore your own account ID and any transactions on NEAR visually.

## Technologies

NEAR Visualizer uses:

- The most up-to-date data via SWR and Server-side rendering [Next.js](https://nextjs.org/)
- Blockchain data from the [NEAR indexer](https://github.com/near/near-indexer-for-explorer/)
- Industry-standard charts and UI via [IBM's Carbon Design Framework](https://www.carbondesignsystem.com/), by using the [Carbon Components](https://github.com/carbon-design-system/carbon/tree/main/packages/react) & [Carbon Charts](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/react) React packages
- A responsive, custom-built UI on both mobile and desktop

## Add new visualizations

NEAR visualizer is designed so that anyone can clone and adapt it to their needs with minimal effort. In fact, you can add a new visualization by modifying two main files, without touching the front-end code.

- Add a data query to `queries.js`
- Add the visualization settings and reference the query in `config.json`

The new page will automatically popup on the side-nav.

## Local development

Clone, run `yarn install` or `npm install` and then start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy

The easiest way to deploy NEAR visualizer is via Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkarlxlee%2Fnear-visualizer)

https://github.com/karlxlee/near-visualizer

https://near-visualizer.vercel.app/
