import { NextFunction, Request, Response } from 'express';

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		return res.status(401).send({
			message: 'Not authenticated',
		});
	}
};
