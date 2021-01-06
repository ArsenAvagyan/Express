import jwt from 'jsonwebtoken';
import { webTokenSecret } from "./secrets"

export const generateToken = (id: any) => {
    return jwt.sign(
        {
            userId: id,
        },
        webTokenSecret,
        { expiresIn: '10h' }
    );
};

export const generateAdminToken = (id: any) => {
    return jwt.sign(
        {
            adminId: id,
        },
        webTokenSecret,
        { expiresIn: '10h' }
    );
};
