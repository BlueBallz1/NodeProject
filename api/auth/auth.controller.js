const service = require('./auth.service');
const oAuthService = require('../../services/oauth.service');

module.exports = {
  loginUser: async (req,res,next) =>{
    try {

      const user = req.user;

      await oAuthService.checkPassword(user.password, req.body.password);
      const tokenPair = oAuthService.generateAccessTokenPair({...user});

      await service.createOauthPair({...tokenPair, user: user._id});
      
      res.json({
        ...tokenPair,
        user
      });


    } catch (e) {
      next(e);
    }
  },

  logoutUser: async (req,res,next) =>{
    try {
      const accessToken = req.get('Autorization');
      
      await service.deleteByOneParams(accessToken);

      //Logout all users

      // await service.deleteManyByParams({user: req.user._id});
      res.json('ok');
    } catch (e) {
      next(e);
    }

  }
};
