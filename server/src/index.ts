/// <reference path='./types/env.d.ts' />;
require('dotenv').config();
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { createConnection } from 'typeorm';
import { userRouter } from './routes/user';
import { mapRouter } from './routes/map';
import { authRouter } from './routes/auth';
import { User } from './entities/User';
import { databaseConfig } from './config/database.config';
import { localStrategy } from './config/passport.config';
import { sessionConfig } from './config/session.config';

const main = async () => {
	await createConnection(databaseConfig).catch((err: Error) =>
		console.log(`Error establishing database connection: ${err.message}`)
	);

	const port = parseInt(process.env.API_PORT, 10);
	const app = express();

	app.use(session(sessionConfig));
	app.use(passport.initialize());
	app.use(passport.session());
	passport.use(localStrategy);

	passport.serializeUser((user: any, done) => {
		return done(null, user.id);
	});

	passport.deserializeUser(async (id, done: any) => {
		try {
			const user = await User.findOne({
				where: {
					id: id,
				},
			});

			if (!user) {
				return done(null, false, { message: 'User does not exist' });
			}

			return done(null, user);
		} catch (err) {
			return done(null, false, { message: 'Failed' });
		}
	});

	app.use(express.json());

	//ROUTES
	app.use('/api/user', userRouter);
	app.use('/api/map', mapRouter);
	app.use('/auth', authRouter);

	app.get('/', (_req, res) => {
		res.send('Hello World!');
	});

	app.listen(port, () => {
		console.log(`Server started at http:///localhost:${port}`);
	});
};

main();
