import React, { Component } from 'react';
import { Query } from 'react-apollo'; 
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';

// write a query -- use the gql tag 
// options - write queries in separate file, import as needed; locate queries in the files where you are going to be doing the query; to access in multiple files, export from that one and import in others
const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
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

// render props - how we use the query
//  dont have to use high order components
//  put a component inside of component that is a query
//  child of component is a function that gives loading state, error, or list of items
//  reccomended way is to do it via apollo with render props
//  dont get errors and loading state with higher order components

//  only child of a query component must be a function

// payload has
//  1. data -> data --> array of returned data from our query (items)
//  2. error --> if something went wrong
//  3. loading --> will be true or false; will flip to true when doing work; false in most cases (doing SSR now) -- will use a lot on the client side

// NOTE - very important to check for loading and errors in components before you assume that the data is there; otherwise you will get errors
class Items extends Component {
  render() {
    return (
      <Center>
        <Query query={ALL_ITEMS_QUERY}>
          {({data, error, loading}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return <ItemsList>
              {data.items.map(item => <Item item={item} key={item.id}/>)}
              </ItemsList>;
          }}
        </Query>
      </Center>
    );
  }
}

export default Items;
export { ALL_ITEMS_QUERY };