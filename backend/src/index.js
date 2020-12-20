// Want the variables in variables.env to be available in application

require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer'); 
const db = require('./db');

// spin up version of graphql yoga server
const server = createServer();

// TODO - Use express middleware to handle cookies 
// TODO - Use express middleware to populate current user (JWT)

server.start({
  // only allow access from approved URLs
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
}, deets => {
  console.log(`Server is now running on port http://localhost:${deets.port}`);
});