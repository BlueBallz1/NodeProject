const apiRouter = require('express').Router();

const userRouter = require('./users/users.router');
const authRouter = require('./auth/auth.router');

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);


module.exports = apiRouter;
