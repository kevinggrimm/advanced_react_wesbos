import UpdateItem from '../components/UpdateItem';

// Going to edit page brings 
// need ID which is only available in a page 
// can (1) export component with router
// or (2) expose query to every page through the container in _app.js
// can also destructure props.query as ({ query })
const Sell = props => (
  <div>
    <UpdateItem id={props.query.id} />
  </div>
);

export default Sell;