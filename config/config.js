import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGODB_URI,
};
export default config;
