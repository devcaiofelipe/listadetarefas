const dotenv = require('dotenv');

dotenv.config({
  path: process.env.NODE_ENVIROMENT === 'test' ? '.env.test' : '.env'
});

