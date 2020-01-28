const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


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
    const updates = { ...args };
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
  },

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);

    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] }
        }
      },
      info
    );

    // Create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // We set the JWT as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // one year cookie
    });
    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({
      where: { email }
    }, info);

    if (!user) {
      throw new Error(`No user with email ${email}`)
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Not valid password')
    }

    const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // one year cookie
    });
    return user;
  },

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return {message: 'Goodbye!'};
  }

};

module.exports = Mutation;
