import { SessionOptions } from 'express-session';

export const sessionConfig: SessionOptions = {
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
};
