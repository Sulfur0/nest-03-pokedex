export const envConfig = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongoDb: process.env.MONGODB_DB,
  port: parseInt(process.env.PORT) || 3002,
  apiSettings: {
    defaultLimit: parseInt(process.env.DEFAULT_LIMIT) || 7,
  },
});
