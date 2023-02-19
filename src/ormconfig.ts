import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  migrationsRun: true,
  logging: true,
  migrationsTableName: 'migration',
  entities: ['dist/**/entities/**/*{.js,.ts}'],
  migrations: ['dist/**/migration/**/*{.js,.ts}'],
  subscribers: ['dist/subscriber/**/*{.js,.ts}'],
  synchronize: true,
} as DataSourceOptions;