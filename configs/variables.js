module.exports={
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/admin',
  ACCESS_TOKEN_SECRET: process.env.MONGO_URL || 'access_secret',
  REFRESH_TOKEN_SECRET: process.env.MONGO_URL || 'refresh_secret',
};
