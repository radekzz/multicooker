const env = process.env.NODE_ENV || 'development';

const config = {
  port: 5000,
  bodyLimit: '60mb',
  imageUploadLimit: 10,
  imageSizeLimit: 1024 * 1024 * 5, // 5 mbs
  jwt_tokentime: 60 * 60 * 6, // 6 hours
};

if (env === 'development') {
  config.mongo_uri = 'mongodb://localhost:27017/multicooker';
  config.jwt_secret = 'h5 vob6 fq2 kl0f pc5';
  config.siteUrl = 'http://localhost:5000';
} else if (env === 'test') {
  config.mongo_uri = 'mongodb://localhost:27017/multicooker-test';
  config.jwt_secret = 'h5 vob6 fq2 kl0f pc5';
  config.siteUrl = 'http://localhost:5000';
} else if (env === 'production') {
  config.mongo_uri = `mongodb://${keys.dbUser}:${keys.dbPassword}@localhost:27017/multicooker-api`;
  config.jwt_secret = keys.jwt_secret;
  config.siteUrl = 'https://multicooker.cz';
}

module.exports = config;