/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
const usersService = require('./users.service');
const {NotFound, Forbiden, BadRequest}= require('../../errors/ApiError');
const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../../configs/regexp.enum');
const { NewUserScheme } = require('./users.validate');
const User = require('../../database/User');
const { param } = require('./users.router');


module.exports = {

  GetUserDynamically: (paramName, from = 'body', dbField) => async (req,res,next) => {
    try{

      const searchData = req[from][paramName];

      const user = await usersService.findUserByParam({[dbField]: searchData});

      if(!user){

        throw new NotFound('User Not Found', 404);
      }

      req.user = user;
      next();
    }
    catch(e){
      next(e);

    }

  },

  CheckUserDuplicates: (paramName, from = 'body', dbField) => async (req,res,next) => {
    try{

      const searchData = req[from][paramName];

      const user = await usersService.findUserByParam({[paramName]: searchData});

      if(user){

        throw new NotFound('User with such info already exist', 404);
      }

      req.user = user;
      next();
    }
    catch(e){
      next(e);

    }

  },


  // CheckIsUserExist: async (req,res,next) =>{
  //   try{
  //     const user = await usersService.findUserByParam({_id: req.params.userId});

  //     if(!user){

  //       throw new NotFound('User Not Found', 404);
  //     }

  //     req.user = user;
  //     next();
  //   }
  //   catch(e){
  //     next(e);

  //   }

  // },

  // findUserByEmail: async (req,res,next) => {
  //   try {
  //     const user = await usersService.findUserByParam({email: req.params.email});

  //     if(!user){

  //       throw new NotFound('User Not Found', 404);
  //     }

  //     req.user = user;
  //     next();
  //   }
  //   catch(e){
  //     next(e);

  //   }
  // },
  // isUserValidCreated: async (req,res,next) =>{
  //   try {
  //     const {firstName, lastName, email,password, age, role} = req.body;
  //     const users = await usersService.GetUserWithoutQuery();

  //     if(typeof firstName !== 'string' || firstName.length <= 2 || firstName.length >= 20 ){
  //       throw new Forbiden('Invalid First Name. Type or lenght');
  //     }

  //     if(typeof lastName !== 'string' || lastName.length <= 2 || lastName.length >= 20 ){
  //       throw new Forbiden('Invalid Last Name. Type or lenght');
  //     }
      
  //     if(typeof age !== 'number' || age <= 0 || age >= 99)
  //     {
  //       throw new Forbiden('Invalid Age.');        
  //     } 

  //     // EMAIL CHECK
  //     for(const items of users){
  //       if(items.email === req.body.email){
  //         throw new Forbiden('This email already exist');
  //       }
  //     }
      
  //     if(EMAIL_REGEXP.test(req.body.email) !== true){
  //       throw new Forbiden('Email invalid.');
  //     }

  //     //PASSWORD CHECK
  //     if(typeof password !== 'string'){
  //       throw new Forbiden('Password: Type Error.');
  //     }

  //     if(password.length <= 6 || password.length >= 32){
  //       throw new Forbiden('Password: Length Error (6-32 symbol).');
  //     }

  //     if(PASSWORD_REGEXP.test(req.body.password) !== true){
  //       throw new Forbiden('Incorect Password.');
  //     }

  //     next();


  //   } catch (e) {
  //     next(e);      
  //   }
  // },
  
  NewUserValidator: (req,res,next) => {
    try {
      const {error} = NewUserScheme.validate(req.body);
      
      if(error){
        throw new BadRequest(error);
      }

      next();
    } 
    catch (e) {
      next(e);
    }
  }

};
