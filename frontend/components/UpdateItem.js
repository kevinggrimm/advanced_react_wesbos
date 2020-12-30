import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import { findFieldsThatChangedType } from 'graphql/utilities/findBreakingChanges';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id } ) {
       id 
       title
       description
       price
    }
  }
`;

// export this - useful for testing and sharing query among other components
//  runs the Mutation createItem in backend -- schema.graphql createItem()
//  need to set up queries and mutations to accept arguments
//  args are of the same name
// When this is called, we pass args with these names; available via variables ($)

// Now, updates to items will be applied

// Apollo provides a loading boolean to help add additional UI functionality for users
const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $description: String, $price: Int) {
    updateItem(id: $id, title: $title, description: $description, price: $price) {
      id
      title 
      description 
      price
    }
  }
`;

// state is helpful to contain data locally in a component 
// before sending to graphql api, we need to store it somewhere

// value prop to form without onChange handler 
//    if you everr tie something that is changeable in DOM to state, lives in two areas
//    always want a single source of truth
//    listen for the change event on the input; intercept event; grab value user wanted to type; set to state
//    that will then set the value of the form

// can remove everything from state - we are only updating things in state that have
class UpdateItem extends Component {
  state = {};
  
  handleChange = e => {
    // give us access to input name, type and value
    const { name, type, value } = e.target; 
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  // Instead of passing the function as a render prop, we can pass it as a component method. The mutation can be passed as a parameter
  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    console.log('Updating Item!!!');
    console.log(this.state);
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      }
    });
    console.log('Updated');
  }  

  // QUERY - as we nest multiple queries & mutations, can compose them into one
  // take data returned query and add to input
  // setting React DEFAULT values -- set input box to text without tying to state
  // only mirroring to state when the changes are submitted
  // changing from {this.state.price} to {data.item.price}
  render() {
    return (
      <Query 
        query={SINGLE_ITEM_QUERY} 
        variables={{
          id: this.props.id
        }}
      >
        {({data, loading}) => {
          if(loading) return <p>Loading...</p>;
          if(!data.item) return <p>No item found for ID: {this.props.id}</p>
          return (
              /* need to return the Mutation in here*/
            <Mutation 
              mutation={UPDATE_ITEM_MUTATION} 
              variables={this.state}
            >
              {(updateItem, { loading, error }) => (
                <Form 
                  onSubmit={e => this.updateItem(e, updateItem)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>

                  <label htmlFor="title">
                    Title 
                    <input 
                      type="text" 
                      id="title" 
                      name="title" 
                      placeholder="Title" 
                      required
                      defaultValue={data.item.title}
                      onChange={this.handleChange}
                      />
                  </label>

                  <label htmlFor="price">
                    Price
                    <input 
                      type="number" 
                      id="price" 
                      name="price" 
                      placeholder="Price" 
                      required
                      defaultValue={data.item.price}
                      onChange={this.handleChange}
                      />
                  </label>

                  <label htmlFor="description">
                    Description
                    <textarea
                      type="text"
                      id="description" 
                      name="description" 
                      placeholder="Enter a description" 
                      required
                      defaultValue={data.item.description}
                      onChange={this.handleChange}
                      />
                  </label>
                      <button type="submit">Sav{loading ? 'ing': 'e'} Changes</button>
                </fieldset>
              </Form>
              )}
            </Mutation>
          );
      }}
      </Query>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION, SINGLE_ITEM_QUERY };