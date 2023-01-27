const User = require('../../database/User');
const util = require('./users.util');
const oauthService = require('../../services/oauth.service');

function GetUserWithoutQuery() {
  return User.find();
}


module.exports = {

  findUserByParam: (searchObject) =>{
    return User.findOne(searchObject).select('+password');
  },
  
  getUsers: async (query = {}) =>{  


    const { page = 1, perPage = 5, ...filterQuery } = query;
    const skip = (page - 1) * perPage;

    const searchQuery = util.buildFilterQuery(filterQuery);

    const users = await User
      .find(searchQuery)
      .limit(perPage)
      .skip(skip);

    const total = await User.countDocuments(searchQuery); 

    return {
      data: users,
      page,
      perPage,
      total
    };

  },

  createUser: async (userObject) => {
    const hashPassword = await oauthService.hashPassword(userObject.password);

    return User.create({...userObject, password: hashPassword });
  },

  removeUser: (userId) => {
    return User.findByIdAndDelete(userId);
  },

  updateUser: (userId,newUserObject) => {
    return User.findByIdAndUpdate(userId,newUserObject);
  },

  delete: (userId) =>{
    return User.findByIdAndDelete(userId);
  },

  GetUserWithoutQuery
};
