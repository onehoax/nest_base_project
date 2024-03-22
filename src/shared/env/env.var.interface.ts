export interface EnvVarInterface {
  // ======================== Log ========================
  NODE_ENV: string;
  PORT: number;

  // ======================== Log ========================
  LOG_PATH: string;
  LOGGER: boolean;
  HIGHLIGHT_LOGGER: boolean;

  // ======================== Mongo ========================
  MONGO_DB_USER: string;
  MONGO_DB_PWD: string;
  MONGO_DB_HOST: string;
  MONGO_DB_PORT: string;
  MONGO_DB_NAME: string;

  // ======================== Redis ========================
  REDIS_HOST: string;
  REDIS_PORT: string;
  REDIS_MAX_RETRIES_PER_REQUEST: string;

  // ======================== JWT ========================
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRATION_TIME: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRATION_TIME: string;
}
