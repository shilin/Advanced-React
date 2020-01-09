const Mutation = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );
    return item;
  },

  async updateItem(parent, args, ctx, info) {
    // first, take a copy of the updates
    const updates = {...args};
    // remove the id from updates
    delete updates.id;
    // run the update method
    const item = await ctx.db.mutation.updateItem(
      {
        where: {
          id: args.id
        },
        data: {
          ...updates
        }
      },
      info
    );

    return item;
  }
};

module.exports = Mutation;
