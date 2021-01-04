import { createUser, verification, login, getUser, addAge } from '../services/users';

export async function createUserController (req, res) {
    const data = await createUser(req.body);
    return res.send(data);
}

export async function verificationController (req, res) {
    const data = await verification(req.body);
    return res.send(data);
}

export async function loginController (req, res) {
    const data = await login(req.body);
    return res.send(data);
}

export async function getUserController (req, res) {
    const data = await getUser(req.user.userId);
    return res.send(data);
}

export async function addAgeController (req, res) {
    const data = await addAge(req.body.age, req.user.userId);
    return res.send(data);
}