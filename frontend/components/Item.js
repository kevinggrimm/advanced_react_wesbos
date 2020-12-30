import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title'; 
import ItemStyles from './styles/ItemStyles'; 
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';

class Item extends Component {
  
  // Can shape out the entire item
  // TODO -- research PropTypes and how to use them
  static propTypes = {
    // item: PropTypes.shape({
    //   title: PropTypes.string.isRequired,
    //   price: PropTypes.number.isRequirred,
    // }),
    item: PropTypes.object.isRequired,
  };
  
  // in JSX, to pass reference to something and for it to be an object literal, use two {{}}
  // check if the item is there and evaluate to true; produce the image

  // For DeleteItem -- passing the item id in as a prop, because this is what we need to pass to our Mutation in order to delete the item.
  
  // LESSON - instead of passing a Link to href, we can pass an object
    // Query that comes along is the URL -- item.id
    // NextJS cannot do "pretty" URLs - requires custom servers + packages

// LIB folder -- not enough to create a separate npm package -- for utilities that are used throughout the applicationn

// Checks if the image is there and then returns the image if found
  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
        {item.image && <img src={item.image} alt={item.title} /> }

        <Title>
          <Link 
            href={{
              pathname: '/item',
              query: { id: item.id },
            }}
          >
            <a>{item.title}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(item.price)}</PriceTag>
        <p>{item.description}</p>
        
        <div className="buttonList">
          <Link 
            href={{
              pathname: 'update',
              query: { id: item.id },
            }}
          >
            <a>Edit ✏️</a>
          </Link>
          <button>Add To Cart</button>
          <DeleteItem id={item.id}>
            Delete Item
          </DeleteItem>
        </div>
      </ItemStyles>
    );
  }
}

export default Item;