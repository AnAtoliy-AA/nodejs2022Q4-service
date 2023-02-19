import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  migrationsRun: false,
  logging: true,
  migrationsTableName: 'migration',
  entities: ['dist/entity/**/*{.js,.ts}'],
  migrations: ['dist/migration/**/*{.js,.ts}'],
  subscribers: ['dist/subscriber/**/*{.js,.ts}'],
  synchronize: true,
};

export = typeOrmConfig;
