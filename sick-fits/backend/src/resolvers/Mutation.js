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
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. find item
    const item = await ctx.db.query.item({ where }, `{id title}`);
    // 2. Check if the own the item or have permissions
    // TODO
    // 3. Delete it!
    return await ctx.db.mutation.deleteItem({ where }, info);
  }
};

module.exports = Mutation;
