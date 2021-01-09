var LocalStrategy = require('passport-local').Strategy;
import bcrypt from 'bcryptjs';
import { User } from '../entities/User';

export const localStrategy = new LocalStrategy(
	{
		usernameField: 'username',
		passwordField: 'password',
		session: true,
	},
	async (username: string, password: string, done: any) => {
		try {
			const user = await User.findOne({
				where: {
					username: username,
				},
			});
			if (!user) {
				return done(null, false, {
					message: 'Incorrect credentials.',
				});
			}

			const hashed = await bcrypt.hash(password, user.salt);

			console.log(hashed);

			if (user.password === hashed) {
				return done(null, user);
			}

			return done(null, false, {
				message: 'Incorrect credentials.',
			});
		} catch (err) {
			done(null, false, {
				message: 'Failed',
			});
		}
	}
);
