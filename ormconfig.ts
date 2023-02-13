import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
  migrationsRun: true,
  logging: true,
  migrationsTableName: 'migration',
  entities: ['dist/**/entities/**/*{.js,.ts}'],
  migrations: ['dist/**/migration/**/*{.js,.ts}'],
  subscribers: ['dist/subscriber/**/*{.js,.ts}'],
  synchronize: false,
} as DataSourceOptions;