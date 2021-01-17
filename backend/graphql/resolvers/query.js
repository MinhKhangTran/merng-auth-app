module.exports = {
  Query: {
    users: async (parent, args, { model }) => {
      return await model.User.find({});
    },
    user: async (parent, { id }, { model }) => {
      return await model.User.findOne({ _id: id });
    },
    me: async (parent, args, { model, user }) => {
      return await model.User.findById(user.id);
    },
  },
};
