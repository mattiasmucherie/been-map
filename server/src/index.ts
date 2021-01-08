/// <reference path='./types/env.d.ts' />;
require('dotenv').config();
import express from 'express';
import { createConnection } from 'typeorm';
import { __prod__ } from './constants';
import { Map } from './entities/Map';
import { User } from './entities/User';

const main = async () => {
	await createConnection({
		type: 'postgres',
		database: process.env.DATABASE_NAME,
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		host: process.env.DATABASE_URL,
		port: parseInt(process.env.DATABASE_PORT, 10),
		entities: [User, Map],
		logging: !__prod__,
		synchronize: !__prod__,
	}).catch((err: Error) =>
		console.log(`Error establishing database connection: ${err.message}`)
	);

	const port = parseInt(process.env.API_PORT, 10);
	const app = express();
	app.use(express.json());

	//USER
	app.get('/api/user/:id', async (req, res) => {
		const { id } = req.params;

		if (!id) {
			res.sendStatus(400);
		}

		const user = await User.findOne(parseInt(id, 10));

		if (!user) {
			res.sendStatus(404);
		}

		res.json(user);
	});

	app.get('/api/user/:id/map', async (req, res) => {
		const { id } = req.params;

		if (!id) {
			res.sendStatus(400);
		}

		const user = await User.findOne(parseInt(id, 10), { relations: ['map'] });

		if (user) {
			res.json(user.map);
		}

		res.sendStatus(404);
	});

	app.get('/api/user', async (_req, res) => {
		const users = await User.find();
		res.json(users);
	});

	//MAP
	app.get('/api/map/:id', async (req, res) => {
		const { id } = req.params;

		if (!id) {
			res.sendStatus(400);
		}

		const map = await Map.findOne(parseInt(id, 10));

		if (!map) {
			res.sendStatus(404);
		}

		res.json(map);
	});

	app.post('/api/map', async (req, res) => {
		console.log('yey');
		const id = 1; // get from token

		const { visitedCountries } = req.body;

		if (!visitedCountries) {
			res.sendStatus(400);
		}
		const map = new Map();
		map.visitedCountries = visitedCountries;
		await Map.save(map);

		const user = await User.findOne(id);

		if (user) {
			user.map = map;
			await user.save();
			res.sendStatus(204);
		}

		res.sendStatus(500);
	});

	app.get('/', (_req, res) => {
		res.send('Hello World!');
	});

	app.listen(port, () => {
		console.log(`Server started at http:///localhost:${port}`);
	});
};

main();
