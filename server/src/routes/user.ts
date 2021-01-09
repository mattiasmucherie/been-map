import express from 'express';
import { User } from '../entities/User';

export let userRouter = express.Router();

userRouter.get('/:id', async (req, res) => {
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

userRouter.get('/:id/map', async (req, res) => {
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

userRouter.get('/', async (_req, res) => {
	const users = await User.find();
	res.json(users);
});
