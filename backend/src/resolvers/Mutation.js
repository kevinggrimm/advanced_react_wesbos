const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO Check if they are logged in

    // API for prisma database is everything in Prisma.GraphQL
    // Search for Mutations -- available to us on the backend
    // this returns a promise; need to make it an async metho 
    const item = await ctx.db.mutation.createItem(
      {
        // Can spread argument into data
        data: {
          ...args 
        }
      // info has the query; ctx.db.mutation needs to take query from frontend and pass to backend; specifies what is returned from the DB
      },
      info
    ); 

    // use for debugging
    // console.log(item);
    return item; 
  },
  
  // info will contain the query that we send from the client side
  updateItem(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { 
      ...args 
    };
    // remove the ID from the updates (not updating the ID, which is passed into the mutation)
    delete updates.id;
    // run the update method
    // db -- how we expose the prisma DB; have access to all mutations
    // where -- which item we want to update 
    // data -- what we want to update
    // info - how the function knows what to return; expecting us to return an item
      // will contian a query from the client side so that we can return the item
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id,
        }, 
      }, 
      // how the function knows what to return
      info
    );
  },

  // Resolver to delete an item.
  // setting this up assuming we have authentication
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    
    // 1. find the item 
    // usually we pass in "info" - by doing that, it takes a query from the frontend -- UPDATE_ITEM_MUTATION in e.g. "UpdateItem.js" and request that those fields are returned
    // sometimes we have an intermediary where we have to perform a seconnd query. in this case, info is not passed, but a manual query is passed
    const item = await ctx.db.query.item({ where }, `{id title}`);
    // 2. check if they own that item, or have the permissions
    // TODO 
    // 3. delete it!
    return ctx.db.mutation.deleteItem({ where }, info);
  },
};

module.exports = Mutations;