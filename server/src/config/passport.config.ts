var LocalStrategy = require('passport-local').Strategy;
import bcrypt from 'bcryptjs';
import { Strategy } from 'passport';
import { User } from '../entities/User';

export const localStrategy: Strategy = new LocalStrategy(
	{
		usernameField: 'username',
		passwordField: 'password',
		session: true,
	},
	async (username: string, password: string, done: any) => {
		try {
			const user = await User.createQueryBuilder()
				.select(['User.id', 'User.username'])
				.where({ username: username })
				.addSelect(['User.password', 'User.salt'])
				.getOneOrFail();

			if (!user) {
				return done(null, false, {
					message: 'Incorrect credentials.',
				});
			}

			const hashed = await bcrypt.hash(password, user.salt);

			if (user.password === hashed) {
				return done(null, user);
			}

			return done(null, false, {
				message: 'Incorrect credentials.',
			});
		} catch (_err) {
			done(null, false, {
				message: 'Failed',
			});
		}
	}
);

export const serializer = (user: any, done: any) => {
	return done(null, user.id);
};

export const deserializer = async (id: number, done: any) => {
	try {
		const user = await User.createQueryBuilder()
			.select(['User.id', 'User.username'])
			.where({ id: id })
			.addSelect(['User.password', 'User.salt'])
			.getOneOrFail();

		if (!user) {
			return done(null, false, { message: 'User does not exist' });
		}

		return done(null, user);
	} catch (err) {
		return done(null, false, { message: 'Failed' });
	}
};
