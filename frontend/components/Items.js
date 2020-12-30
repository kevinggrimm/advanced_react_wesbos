import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config';

// 1. write a query -- use the gql tag 
  // options - write queries in separate file, import as needed; locate queries in the files where you are going to be doing the query; to access in multiple files, export from that one and import in others
  // Import GQL and write a query

// LESSON - Apollo will automatically add a typename with the results

// CONCEPT - Adding arguments to GraphQL
  // Import perPage details from config; set as default variable for "first"
// TODO -- Add "orderBy: createdAt_DESC" later
const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;
// 2. Query is used via a "render prop" 
  // render props - how we use the query
  //  dont have to use high order components
  //  put a component inside of component that is a query
  //  child of component is a function that gives loading state, error, or list of items
  //  recommended way is to do it via apollo with render props
  //  dont get errors and loading state with higher order components

//  The only child of a query component must be a FUNCTION
  // Pass an arrow function that returns a payload

// payload has
  //  1. data -> data --> array of returned data from our query (items)
  //  2. error --> if something went wrong
  //  3. loading --> will be true or false; will flip to true when doing work; false in most cases (doing SSR now) -- will use a lot on the client side
// we are destructuring these from the payload within the query/mutation

// NOTE - very important to check for loading and errors in components before you assume that the data is there; otherwise you will get errors
// Query component takes a query prop 

// Making skip + first dynamic
  // (1) skip ==> this.props.page * perPage - perPage
    // If it is on page 1, we skip: (1 * 4) - 4 ==> 0
    // If page 2, skip: (2 * 4) - 4 ==> 4
  // (2) first ==> perPage (next X items) --> default value, so we can exclude it

// CHALLENGE - Fetching new items with Pagination
  // If a new Item is added and you return to the Home Page, it will not be on any of the pages
    // This is because the Home page was already fetched before
    // This means that all of our data is out of date 
  // We need "CACHE INVALIDATION"
    // Delete page 1, 2, 3, etc. pieces of the cache because they are out of date
    // If we were to delete an item from Page 1, then all of the pages will be out of date
    // ==> There is a ripple effect across all previously cached pages
  // SOLUTION #1 -- Make your query manually hit the network
      // fetchPolicy = "network-only"
        // Now, when the items are hit, it is because it is NEVER using the cache -- 
      // CON -- Lose benefits of using the cache
        // Every time someone hits a page they have been on, we need to go to the server and re-download the data
  // SOLUTION #2 - "refetch query"
    // In the Mutation on "CreateItem.js", can pass a refetchQueries 
      // Allow us to pass an array of queries that need to then refresh themselves based on the server
        // Could pass the query of Items.js, which is the query ALL_ITEMS_QUERY
    // CON -- have to specify which ones to refresh (skip/first values)
      // How do you know how many pages there are
      // Potentially refetching hundreds of pages
  // SOLUTION #3 - Delete all items from the cache (IDEAL)
    // Currently no way to set a time limit on the cache (e.g. refetch every 2 minutes)
    // Because there is no way to delete PART of the cache
      // Planning to introduce something that will let us invalidate part of the cache
      // NOTE --> Wes is going to update the course when this comes out
    // Can delete ALL of the cache, but this is a bad soluion
      // Items inn the Cart, Signed in, Orders that we viewed -- this would all go as well
class Items extends Component {
  render() {
    return (
      <Center>
        <Pagination page={this.props.page} />
        <Query query={ALL_ITEMS_QUERY} variables={{
          skip: this.props.page * perPage - perPage
        }}>
          {({data, error, loading}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <ItemsList>{data.items.map(item => <Item item={item} key={item.id} />)}</ItemsList>
            );
          }}
        </Query>
        <Pagination page={this.props.page} />
      </Center>
    );
  }
}

export default Items;
export { ALL_ITEMS_QUERY };