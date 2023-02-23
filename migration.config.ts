import { DataSource } from 'typeorm';
import configService from './src/ormconfig';

const dataSource = new DataSource(configService);
dataSource.initialize();

export default dataSource;
