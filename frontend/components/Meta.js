import Head from 'next/head';

// State and lifecycle method are handled in higher-order components
// These are just display components

// Default title - can be overwritten in components
const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/static/favicon.png" />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <title>Sick Fits!</title>
  </Head>
);

export default Meta;
