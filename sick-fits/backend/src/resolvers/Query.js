const { forwardTo } = require('prisma-binding');

const Query = {
  items: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  item: forwardTo('db'),

  async me(parent, args, ctx, info) {
    const userId = ctx.request.userId;
    if (userId) {
    const user = await ctx.db.query.user({ where: { id: userId } }, info);
    return user;
    }
    return null;
  }

};

module.exports = Query;
