import { ConnectionOptions } from 'typeorm';
import { __prod__ } from '../constants';
import { Map } from '../entities/Map';
import { User } from '../entities/User';

export const databaseConfig: ConnectionOptions = {
	type: 'postgres',
	database: process.env.DATABASE_NAME,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	host: process.env.DATABASE_URL,
	port: parseInt(process.env.DATABASE_PORT, 10),
	entities: [User, Map],
	logging: !__prod__,
	synchronize: !__prod__,
};
