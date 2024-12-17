import 'dotenv/config';
console.log('Process Env:', process.env.REACT_APP_APOLLO_ENV);

export default ({ config }) => ({
  
  ...config,
  extra: {
    env: process.env.REACT_APP_APOLLO_ENV || 'DEVELOPMENT',
    apolloUri: process.env.REACT_APP_APOLLO_URI || 'http://localhost:4000/graphql',
  },
});
