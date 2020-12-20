const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO Check if they are logged in

    // API for prisma database is everything in Prisma.GraphQL
    // Search for Mutations -- available to us on the backend
    // this returns a promise; need to make it an async metho 
    const item = await ctx.db.mutation.createItem({
      // Can spread argument into data
      data: {
        ...args 
      }
    // info has the query; ctx.db.mutation needs to take query from frontend and pass to backend; specifies what is returned from the DB
    }, info); 

    // use for debugging
    // console.log(item);

    return item; 
  }
};

module.exports = Mutations;
