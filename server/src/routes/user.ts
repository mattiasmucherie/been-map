import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../entities/User';
import passport from 'passport';

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

userRouter.post('/', async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.sendStatus(400);
	}

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const user = new User();
	user.username = username;
	user.password = hash;
	user.salt = salt;

	await user.save().catch((err) => {
		res.sendStatus(500);
	});

	passport.authenticate('local')(req, res, function () {
		res.redirect('/');
	});
});
