import express from 'express';
import { Map } from '../entities/Map';
import { User } from '../entities/User';

export let mapRouter = express.Router();

mapRouter.get('/:id', async (req, res) => {
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

mapRouter.post('/', async (req, res) => {
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
