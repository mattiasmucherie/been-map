import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../entities/User';
import passport from 'passport';

export let userRouter = express.Router();

userRouter.get('/:id', async (req, res) => {
	const { id } = req.params;

	if (!id) {
		return res.status(400);
	}

	const user = await User.findOne(parseInt(id, 10));

	if (!user) {
		return res.status(404);
	}

	return res.status(200).json(user);
});

userRouter.get('/:id/map', async (req, res) => {
	const { id } = req.params;

	if (!id) {
		return res.status(400);
	}

	const user = await User.findOne(parseInt(id, 10), { relations: ['map'] });

	if (user) {
		return res.status(200).json(user.map);
	}

	return res.status(404);
});

userRouter.get('/', async (_req, res) => {
	const users = await User.find();
	return res.status(200).json(users);
});

userRouter.post('/', async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400);
	}

	if (username.length < 5) {
		return res
			.status(400)
			.json({ message: 'Username length should be greater than 5' });
	}

	if (password.length < 8) {
		return res
			.status(400)
			.json({ message: 'Password length should be greater than 8' });
	}

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const user = new User();
	user.username = username;
	user.password = hash;
	user.salt = salt;

	await user.save().catch((err) => {
		return res.status(500);
	});

	passport.authenticate('local')(req, res, function () {
		res.redirect('/');
	});
});
