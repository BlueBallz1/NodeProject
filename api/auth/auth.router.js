/* eslint-disable no-unused-vars */
const authRouter = require('express').Router();

const authController = require('./auth.controller');
const mdlwr = require('./auth.middleware');
const userMdlwr = require('../users/users.middleware');

authRouter.post('/',userMdlwr.GetUserDynamically('email','body','email'),authController.loginUser);
authRouter.post('/logout',mdlwr.ValidateAccessToken,authController.logoutUser);

module.exports = authRouter;

