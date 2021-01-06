import { createUser, verification, login, getUser, addAge } from '../services/users';
import { Request, Response } from 'express';

export async function createUserController (req: Request, res: Response) {
    const data = await createUser(req.body);
    return res.send(data);
}

export async function verificationController (req: Request, res: Response) {
    const data = await verification(req.body);
    return res.send(data);
}

export async function loginController (req: Request, res: Response) {
    const data = await login(req.body);
    return res.send(data);
}

export async function getUserController (req: Request, res: Response) {
    const data = await getUser(req.user.userId);
    return res.send(data);
}

export async function addAgeController (req: Request, res: Response) {
    const data = await addAge(req.body.age, req.user.userId);
    return res.send(data);
}