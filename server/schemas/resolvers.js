// import user model
const { User, Book } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  Query: {
    async me(_, args, context) {
      const foundUser = await User.findOne({_id: context.user._id });
  
      if (!foundUser) {
        // return res.status(400).json({ message: 'Cannot find a user with this id!' });
        return null;
      }
  
      // res.json(foundUser);
      return (foundUser);
    },
  },
  Mutation: {
    async createUser(_, args) {
      const user = await User.create({
        username: args.username,
        email: args.email,
        password: args.password
      });
  
      if (!user) {
        // return res.status(400).json({ message: 'Something is wrong!' });
        return null;
      }
      const token = signToken(user);
      // res.json({ token, user });
      return ({ token, user });
    },
    async login(_, args) {
      const user = await User.findOne({
        email:args.email
      });
      if (!user) {
        return null;
      }
  
      const correctPw = await user.isCorrectPassword(args.password);
  
      if (!correctPw) {
        return null;
      }
      const token = signToken(user);
      return ({ token, user });
    },

    
    async saveBook(_, {book}, context) {
     
      if(!context.user || !book){
        return null;
      }
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        )
  
      return (updatedUser);
    },

    async deleteBook(_, {bookId}, context) {
     
      if(!context.user || !book){
        return null;
      }
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: {bookId} } },
          { new: true, runValidators: true }
        )
  
      return (updatedUser);
    },
  }
}
