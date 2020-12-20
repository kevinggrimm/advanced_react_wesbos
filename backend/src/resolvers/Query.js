const { forwardTo } = require('prisma-binding');

// need a method on every query that lines up with the queries that we have
// can hit an external REST API and return data, pull data from memory, pull from a DB
// This is where our DB calls will go regardless of what we use on the backend
const Query = {
  // helpful for quickly mocking something up; no need for authentication, push/pull data to dB
  // add custom resolvers as you need to add custom logic
  items: forwardTo('db'),
  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items();
    
  //   return items
  // }
};

module.exports = Query;