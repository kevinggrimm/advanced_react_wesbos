import Items from '../components/Items';

// This is where we can access the page number, via props
// (1) Pass down query.page to Items
// (2) From Items.js, pass down query.page to Pagination
  // ==> Pagination component should then have access to page
const Home = props => (
  <div>
    <Items page={parseFloat(props.query.page) || 1} />
  </div>
);

export default Home;