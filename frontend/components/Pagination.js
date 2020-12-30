import React from 'react';
import PaginationStyles from './styles/PaginationStyles';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import { Query } from 'react-apollo';
import { perPage } from '../config';

// (1) Specify name of query from schema.graphql
// (2) Import a Query component to use on your page
const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

// Things to consider for Pagination
  // (1) Total items in database
  // (2) Items to display on page
  // (3) Items on the current page

// If there were 1,000 items, we dont want a query to fetch 1,000 items
// SOLUTION - Prisma "CONNECTIONS"
  // Search for "Connection" in prisma.graphql

  // Returns aggregate data about the data itself
  // (1) schema.graphql, under Query, add the itemsConnection
  // (2) add to resolvers Query.js

// USES 
  // (1) Categories and you need to paginate based on the category

// Pagination - Steps
  // (1) Number of pages to load (config.js)
  // (2) Page number comes in via the Items page as a prop - we need to pass it down
  // 

// Only going to get the linking working for now
// Will then modify the items component to only show a select amount

// LESSON - Prefetch attribute on Link
  // ==> In production, this will prerender the prevoius and forward looking page 
  // Loading next and previous one
  // Does not work in dev mode -- will always work in production mode
  // Will make website snappier - good performance boost
const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
      {({data, loading, error}) => {
        if (loading) return <p>Loading...</p>
        const count = data.itemsConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        const page = props.page;
        return ( 
          <PaginationStyles>
            <Head>
              <title>
                Sick Fits! - Page {page} of {pages}
              </title>
            </Head>
            <Link 
              prefetch
              href={{
                pathname: 'items',
                query: { page: page - 1 },
              }}
            >
              <a className="prev" aria-disabled={page <= 1}>
                Prev
              </a>
            </Link>
            <p>Page {page} of {pages}!</p>
            <p>{count} Items Total</p>
            <Link
              prefetch
              href={{
                pathname: 'items',
                query: { page: page + 1 },
              }}
            >
              <a className="prev" aria-disabled={page >= pages}>
                Next
              </a>
            </Link>
          </PaginationStyles>  
        );
      }
    }
    </Query>
)

export default Pagination;