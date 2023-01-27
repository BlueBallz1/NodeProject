const { Unautorizade } = require('../../errors/ApiError');
const oathService = require('../../services/oauth.service');
const service = require('./auth.service');

module.exports = {
  ValidateAccessToken: async (req,res,next) =>{
    try {
      const accessToken = req.get('Authorization');

      if(!accessToken){
        throw new Unautorizade('No token');
      }

      oathService.validateAccessToken(accessToken);

      const tokenWithUser = await service.getByParams({accessToken});

      if(!tokenWithUser){
        throw new Unautorizade('Invalid token');
      }

      req.user = tokenWithUser.user;
      next();

    } catch (e) {
      next(e);
    }
  }
};
