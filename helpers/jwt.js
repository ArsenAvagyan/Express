import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
    return jwt.sign(
        {
            userId: id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '10h' }
    );
};

export const generateAdminToken = (id) => {
    return jwt.sign(
        {
            adminId: id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '10h' }
    );
};
