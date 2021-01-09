/// <reference path='./types/env.d.ts' />;
require('dotenv').config();
import express from 'express';
import { createConnection } from 'typeorm';
import { __prod__ } from './constants';
import { databaseConfig } from './config/database.config';
import { userRouter } from './routes/user';
import { mapRouter } from './routes/map';

const main = async () => {
	await createConnection(databaseConfig).catch((err: Error) =>
		console.log(`Error establishing database connection: ${err.message}`)
	);

	const port = parseInt(process.env.API_PORT, 10);
	const app = express();
	app.use(express.json());
	app.use('/api/user', userRouter);
	app.use('/api/map', mapRouter);

	app.get('/', (_req, res) => {
		res.send('Hello World!');
	});

	app.listen(port, () => {
		console.log(`Server started at http:///localhost:${port}`);
	});
};

main();
