import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

// Destructure component value from Props
// Render component in here (sell or index)
// Putting state within MyApp will maintain the state across each page

// need to surface page #s for application
// can destructure apollo in the 
class MyApp extends App {
  
  // nextJS lifecycle method; runs before first render
  // anything return is exposedd via props
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    // crawls every page we have for queries and mutations that need to be fetched
    // list of items, shopping carts, etc -- all need to be fired off and resolved before rendering the page
    // returns all data
    // NOTE: nextJS + Apollo documentation have examples for getting this to work for Server Side rendering
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>        
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

// wrapping exposes 'apollo'
export default withData(MyApp);