import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { webTokenSecret } from "../helpers/secrets"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, webTokenSecret, (err: any, user: any) => {
            if (err) 
                return res.status(400).send(err);
      

            req.user = user;
            next();
        });
    } else 
        res.status(400).send('Unauthorized');
  
};
