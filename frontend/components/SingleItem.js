import React, { Component } from 'react';
import gql from 'graphql-tag';
import Head from 'next/head';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import styled from 'styled-components';

// contain -- will always fit the image in, even if it is very wide/short; can stretch an image and dont need to worry about it being stretch
// cover -- will cover regardless of the width/height
const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

// 1. Start out with the query
// NOTE -- queries should go on Components, not pages
// 2. Wrap the entire return() block in a Query component
  // To do this, import Query from react-apollo'
  // TODO -- look up examples of Query used in documentation
// 3. Take the return <div> and replace it with a <Query>
  // This is where we set the query and variables that must be passed to the query (in this case, it is just ID)
// 4. Within the query block, we pass our child, which is the payload
  // Contains error, loading and data
  // BEST PRACTICE -- check for errors and loading beore returning any data
  // The child component is just an inline function that does the following: (1) Destructures error, loading and data (2) checks for errors and loading (3) returns a page with information from the data
// 5. From here it is just a templating exercise - we are laying out the items from data that we want to see on the page
  // Import styled from styled-components


// LESSON - check we can access the Item ID
  // dev tools -- look up props of SingleItem
    // props are empty
  // Search for Item component - props has access to query
    // so, we have in "Item.js" (on the page) but not in "SingleItem.js" (the component)
  // TO PASS IT DOWN:
    // set the id as props.query.id
  // If we now check the props of SingleItem, will it is available
const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id 
      title 
      description 
      largeImage
    }
  }
`;

// NOTE -- 
  // "props.id" will not work with "Proper Components"
  // Need to pass it down as "this.props.id"

// LESSON - what this will not do:
  // If we add a character to the ID (e.g., add an "x" to the URL)
  // and we ddont get an item, it will still render out the SingleItemComponent
// How to Handle - two options
  // (1) On the Server Side, implement a custom resolver in Query.js; 
    // If there is no item found, we can throw an error on the server; this would then resolve to an error
  // (2) To handle client side, we can check (done below)
// We will learn how to do this on the server side when we get into custom resolvers

// LESSON - To avoid have to state "data.item.<attribute>" every time:
  // 1. Destructure the componnent
  // 2. Make a variable 

// LESSON - What if we want to update the "Sick Fits" title in the "Meta" Component?
  // Do we need to pass the item directly to Meta?
  // Sometimes you query something in a component, but you need to update something on the page, but it is a little bit higher
  // In this case, it's not even part of the Document - it is part of the Head tag in the HTML 
  // This is known as a "Side Efffect" -- when you reach outside of something
    // Generally, they are a bad practice, but in this case it is necessary
    // SOLUTION - using something built into Next.js that can introduce side-effects
    // (1) Import Head Tag from 'next/head'
      // TIP - you can have multiple head tags throughout your application
        // It will collect throughout and apply to the actual head of rendered out doc
    // (2) Add a Head tag (may seem weird bc we are not near the Head)
      // Can give a title and pass the {item.title}
      // This will then render out the Head in the appropriate location on your app
  // TODO - research side effects in next JS
    // Reach outside of something to update it
class SingleItem extends Component {
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{
        id: this.props.id,
      }}>
        {({ data, loading, error }) => {
          if (error) return <Error error={error}/>;
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No Item Found for {this.props.id}</p>;
          const item = data.item;
          console.log(data);
          return (
            <SingleItemStyles>
              <Head>
                <title>Sick Fits | {item.title}</title>
              </Head>
              <img src={item.largeImage} alt={item.title} />
              <div className="details">
                <h2>Viewing {item.title}</h2>
                <p>{item.description}</p>
              </div>
            </SingleItemStyles>
          )
        }}
      </Query>
    ); 
  }
}

export default SingleItem;