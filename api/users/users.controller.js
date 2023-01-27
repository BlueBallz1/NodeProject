/* eslint-disable no-unused-vars */
const usersService = require('./users.service');

module.exports = {

  getMyProfile: (req,res,next) =>{
    try {
      const unreadMessage = 5;

      res.json({
        ...req.user.toObject(),
        additionalData: {unreadMessage}
      });

    } catch (e) {
      next(e);
    }
  },
  
  getAllUsers: async (req,res,next)=>{
    try{
      const users = await usersService.getUsers(req.query);

      res.json(users);
    }
    catch(e){
      next(e);
    }
        
  },

  getUserById: (req,res,next)=>{
    try{

      // const user = await usersService.findUserByParam({ _id: req.params.userId });
      res.json(req.user);
    }
    catch(e){
      next(e);
    }
  },

  createUser: async (req,res,next) =>{
    try{
      const createdUser = await usersService.createUser(req.body);
      res.status(201).json('User Has been created');
    }
    catch (e) {
      next(e);
    }

  },

  deleteUser: async (req, res,next)=>{
    try {
      const remUser = await usersService.removeUser(req.params.userId);
      res.status(200).json('User has been deleted');
      next();
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req,res,next)=>{
    try {
      const chngUser = await usersService.updateUser(req.params.userId,req.body);
      res.status(200).send('User has been update');
      next();

    } catch (e) {        
      next(e);
    }
  },

};
