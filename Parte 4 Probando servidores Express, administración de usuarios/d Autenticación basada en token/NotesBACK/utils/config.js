require('dotenv').config()
//const config = require
const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

  console.log('config.js NODE_ENV:', process.env.NODE_ENV);
  //console.log('config.js Using DB URI:', config.MONGODB_URI);
module.exports = {
  MONGODB_URI,
  PORT
}