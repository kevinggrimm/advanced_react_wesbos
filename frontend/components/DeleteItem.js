import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

// After writing mutation, we then want to wrap the button in a Mutation component

// destructure if there is an error to notify if, for rinstance, the user doesnt own the item

// Interface Updates in Apollo -- item is deleted on the backend, BUT it is not deleted in the cache - want to remove from the page 
// two options: (1) refetch the entire query on the home page; will hit the backend for a list of items (2) use an UPDATE function (used to remove a single item, for instance)
  // For Option #2, "update" is simply another argument passed to the mutation function
  // apollo gives 2 things when the update happens: (1) access to the cache (all items it has), (2) payload data that came back from the item that got deleted
    // exported ALL_ITEMS_QUERY so that we can import it here 

// TODO -- review the following in Apollo/GraphQL documentation:
// 1. cache.readQuery // cache.writeQuery (Apollo)
// 2. Mutation parameters (mutation, variables, update)
class DeleteItem extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. read the cache for the items that we want (can't reach directly into the cache to delete one; need to use a graphql query to fetch items from the cache and then write back into the cache); used ALL_ITEMS_QUERY 
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // printing the payload to see how apollo returns it. Will be the seconod item in the response ==> data.deleteItem.id
    console.log(data, payload);
    // 2. filter the deleted item out of the page
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
    // // 3. Put the items back
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  // The name of the mutation that is defiend within gql`` above is returned within the Mutation block. Here it is 'deleteItem', which matches the mutation name in DELETE_ITEM_MUTATION
  render() {
    return (
      <Mutation 
        mutation={DELETE_ITEM_MUTATION} 
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, { error }) => (
          <button onClick={() => {
            if (confirm('Are you sure you want to delete this item?')) {
              deleteItem();
            }
          }}>{this.props.children}</button>
        )}
      </Mutation>
    );
  }
}

export default DeleteItem;