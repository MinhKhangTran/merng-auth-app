const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { AuthenticationError } = require("apollo-server-express");
require("dotenv").config();

module.exports = {
  Mutation: {
    login: async (parent, { email, password }, { model }) => {
      const user = await model.User.findOne({ email });
      // Check if user is available
      if (!user) {
        throw new AuthenticationError("Es gibt kein User mit dieser Email");
      }
      // password check
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new AuthenticationError("Leider falsches Password");
      }
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    },
    register: async (parent, { email, username, password }, { model }) => {
      const user = await model.User.findOne({ email });
      // check if user is available
      if (user) {
        throw new AuthenticationError("Diese E-mail ist schon vergeben");
      }
      // Password hashen
      const hashed = await bcrypt.hash(password, 10);
      try {
        const newUser = await model.User.create({
          username,
          email,
          password: hashed,
        });
        return jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      } catch (error) {
        throw new Error("Es gab ein Fehler beim Registieren");
      }
    },
  },
};
