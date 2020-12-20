// Connects to the remote prisma DB and gives us the ability to query it with JS
// https://github.com/prisma-labs/prisma-binding
const { Prisma } = require('prisma-binding'); 

const db = new Prisma({
  // generated prisma.graphql 
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false,
});

module.exports = db;