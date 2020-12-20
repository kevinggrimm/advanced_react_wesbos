const { GraphQLServer } = require('graphql-yoga');

// resolvers -- answer where the data comes from & what does it do in the DB
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');

// Create the GraphQL Yoga Server
// Creating two graphQL servers: (1) prisma (requries own type definitions); (2) graphQL definitions
// Match up everything in schema with a mutation or a query resolver
function createServer() {
  return new GraphQLServer({
    // file cannot be empty and needs a query and mutation type to resolve to
    // doesnt expose anything from Prisma API yet - we selectively expose that and write our
    // own resolvers 
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOption: {
      requireResolversForResolveType: false,
    },
    // Need to be able to access the DB from the resolvers
    // surface DB on every request
    context: req => ({ ...req, db }),
  });
}

module.exports = createServer;