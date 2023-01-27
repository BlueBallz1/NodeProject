const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { BadRequest, Unautorizade } = require('../errors/ApiError'); 
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../configs/variables');


const hashPassword = (password) => bycrypt.hash(password,10);

const checkPassword = async (hashedPassword, password) => {
  const isPasswordEqual = await bycrypt.compare(password,hashedPassword);

  if(!isPasswordEqual){
    throw new BadRequest('Email or password is wrong');
  }
};

const generateAccessTokenPair = (encodeData) =>{
  const accessToken = jwt.sign(encodeData, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
  const refreshToken = jwt.sign(encodeData, REFRESH_TOKEN_SECRET, {expiresIn: '30d'});

  return{
    accessToken,
    refreshToken
  };

};

const validatePairToken = () =>{

};

const validateAccessToken = (accessToken = '') => {
  try {
    return jwt.verify(accessToken,ACCESS_TOKEN_SECRET);
  } catch (e) {
    throw new Unautorizade(e.message || 'Invalid token');
  }
};


module.exports = {
  hashPassword,
  checkPassword,
  generateAccessTokenPair,
  validatePairToken,
  validateAccessToken
};
