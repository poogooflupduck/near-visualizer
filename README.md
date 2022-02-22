# NEAR Visualizer

### Live Demo: https://near-visualizer.vercel.app/

## Technologies

NEAR Visualizer uses:

- The most up-to-date data via SWR and Server-side rendering [Next.js](https://nextjs.org/)
- Blockchain data from the [NEAR indexer](https://github.com/near/near-indexer-for-explorer/)
- Industry-standard charts and UI via [IBM's Carbon Design Framework](https://www.carbondesignsystem.com/), by using the [Carbon Components](https://github.com/carbon-design-system/carbon/tree/main/packages/react) & [Carbon Charts](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/react) React packages
- A responsive, custom-built UI on both mobile and desktop

## Add new visualizations

- Add a data query to queries.js
- Add the visualization settings and reference the query in config.json

## Local development

Clone, run `yarn install` or `npm install` and then start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy

The easiest way to deploy NEAR visualizer is via Vercel.

https://github.com/karlxlee/near-visualizer

https://near-visualizer.vercel.app/
