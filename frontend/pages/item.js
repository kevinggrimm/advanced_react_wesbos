import SingleItem from '../components/SingleItem';
import { printIntrospectionSchema } from 'graphql/utilities';

const Item = props => (
  <div>
    <SingleItem id={props.query.id}/>
  </div>
);

export default Item;