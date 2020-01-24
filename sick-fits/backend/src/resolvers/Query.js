const { forwardTo } = require('prisma-binding');

const Query = {
  items: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  item: forwardTo('db'),

  async me(parent, args, ctx, info) {
    console.log('ctx.request.userId');
    console.log(ctx.request.userId);
    const userId = ctx.request.userId;
    const user = await ctx.db.query.user({ where: { id: userId } }, info);
    console.log(user);
    return user;
  }
  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items();
  //   return items;
  // }
};

module.exports = Query;
