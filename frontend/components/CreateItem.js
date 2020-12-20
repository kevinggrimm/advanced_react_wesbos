import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

// export this - useful for testing and sharing query among other components
//  runs the Mutation createItem in backend -- schema.graphql createItem()
//  need to set up queries and mutations to accept arguments
//  args are of the same name
// When this is called, we pass args with these names; available via variables ($)
const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
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

// CREATE_ITEM_MUTATION function is exposed in the component
// wrap the form tag in a mutation component
class CreateItem extends Component {
  state = {
    title: 'Cool Shoes',
    description: 'I love shoes',
    image: 'dog.jpg',
    largeImage: 'bigdog.jpg',
    price: 5000,
  };
  
  // adding method as arrow function -- "instance property"
  //  can access "this" to execute this.setState
  //  if this was a regular method, ES6 classes do not bind regular methods to the instance of the property
  handleChange = e => {
    // give us access to input name, type and value
    const { name, type, value } = e.target; 
    // console.log({ name, type, value });
    // text that comes out of an input will come out as a string
    const val = type === 'number' ? parseFloat(value) : value;
    // Computed property names -- set the name of it (title, price, description); mirror change to state
    // allows us to reuse the function in different labels
    // if you add more inputs in the future, no need to create extra handlers
    this.setState({ [name]: val });
  }; 

  // For description -- normally in HTML, not allowed ot self close a text area; also not allowed to have a value prop
  //  allowed in react -- can bind in specific stae

// SUBMIT buttons -- normally pushed up into the URL bar
//  we want to listen for a submit event and push this up to the server
//    can do this right in line with Form


// PUSHING DATA TO GRAPHQL -- MUTATION
// 1. write a mutation to submit data 
// 2. expose mutation function to our form tag using a mutation component
// Mutation takes a mutation; needs the variables when mutation runs
//    (a) specify in component (b) pass at runtime
//    When mutation runs, it takes a copy of variables within this.state and sends it as a mutation\
//    want to return everything on the page -- use an IMPLICIT RETURN
//      replace { } with (); that produces an implicit return in ES6 - returns whatever is there without using "return" word

// LOADING
// want to stop the user from messing with submit
//  wrap everything in a fieldset, which takes a 'disabled' attribute
// <fieldset disabled={loading}>
//  accessibility --> aria-busy ==> tells users whether the field is busy or not
//    This is enabled through styled components in Form.js
// Apollo will flip loading onto true or false for us 

// To submit -- call createItem() function - exposed via render prop
// Can then look in Prisma DB to see what was created


  render() {
    return (
    <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
      {(createItem, { loading, error }) => (
        <Form onSubmit={async e => {
          // Stop the form from submitting
          e.preventDefault();
          // call the mutation
          // console.log(this.state);
          const res = await createItem(); 
          // change them to the single item page - programmatically route someonne
          // Will need to update -- will hit an issue with pagination (re-fetching queries)
          Router.push({
            pathname: '/item',
            query: { id: res.data.createItem.id }
          })
          console.log(res);
        }}>
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
              value={this.state.title}
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
              value={this.state.price}
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
              value={this.state.description}
              onChange={this.handleChange}
              />
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </Form>
      )}
      </Mutation>
    )
    ;
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };