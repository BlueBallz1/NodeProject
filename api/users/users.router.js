const userRouter = require('express').Router();

const controller = require('./users.controller');
const commonMmldw = require('../../middleware/common.middleware');
const authMdlwr = require('../auth/auth.middleware');
const mdlwr = require('./users.middleware');

userRouter.get('/',controller.getAllUsers);
userRouter.post('/',mdlwr.NewUserValidator,mdlwr.CheckUserDuplicates('email','body'),controller.createUser);
userRouter.get('/profile',authMdlwr.ValidateAccessToken, controller.getMyProfile);

userRouter.use('/:userId',commonMmldw.ObjectIdValidator('userId'),mdlwr.GetUserDynamically('userId','params','_id'));
userRouter.get('/:userId', controller.getUserById);
userRouter.delete('/:userId',controller.deleteUser);
userRouter.put('/:userId',controller.updateUser);

module.exports = userRouter;
