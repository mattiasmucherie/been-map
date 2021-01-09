import express from 'express';
import passport from 'passport';

export let authRouter = express.Router();

authRouter.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
	})
);

authRouter.get('/authenticated', (req, res) => {
	if (req.isAuthenticated()) {
		res.json({ authenticated: true, user: req.user });
	}
	res.status(403).json({ authenticated: false });
});
