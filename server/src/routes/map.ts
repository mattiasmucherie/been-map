import express from 'express';
import { Map } from '../entities/Map';
import { User } from '../entities/User';
import { authMiddleware } from './../middlewear/auth.middlewear';

export let mapRouter = express.Router();

mapRouter.get('/:id', async (req, res) => {
	const { id } = req.params;

	if (!id) {
		res.sendStatus(400);
		return;
	}

	const map = await Map.findOne(parseInt(id, 10));

	if (!map) {
		res.sendStatus(404);
		return;
	}

	res.json(map);
});

mapRouter.post('/', authMiddleware, async (req, res) => {
	//@ts-ignore
	const { id } = req.user;

	const { visitedCountries } = req.body;

	if (!visitedCountries) {
		res.sendStatus(400);
		return;
	}
	const map = new Map();
	map.visitedCountries = visitedCountries;
	await Map.save(map);

	const user = await User.findOne(id);

	if (user) {
		user.map = map;
		await user.save();
		res.sendStatus(204);
		return;
	}

	res.sendStatus(500);
});

mapRouter.put('/', authMiddleware, async (req, res) => {
	//@ts-ignore
	const { id } = req.user;

	const { visitedCountries } = req.body;

	if (!visitedCountries) {
		res.sendStatus(400);
		return;
	}

	const user = await User.findOne(parseInt(id, 10), { relations: ['map'] });

	if (user) {
		let map = await Map.findOne(user.map.id);
		if (map) {
			map.visitedCountries = visitedCountries;
			map.save();
			res.status(200).json(map);
			return;
		}
		res.sendStatus(404);
		return;
	}
	res.sendStatus(500);
});
