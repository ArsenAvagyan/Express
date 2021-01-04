import bcrypt from 'bcrypt';
import Joi from 'joi';
import createError from 'http-errors';
import { customAlphabet } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/users';
import { History } from '../models/history';
import { sendMsg } from '../helpers/sendgrid';
import { generateToken } from '../helpers/jwt';

export async function createUser (userData) {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(15).required(),
        lastName: Joi.string().min(3).max(15).required(),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'ru'] },
        }),
        password: Joi.string().min(4).max(15).required(),
    });

    const { error } = schema.validate(userData);
    if (error) return createError(400, error.details[0].message);

    const existedUser = await User.findOne({ email: userData.email });
    if (existedUser) return createError(400, 'User already exists.');

    const hashedPass = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPass;
    const userId = uuidv4();

    const isVerified = false;
    const nanoid = customAlphabet('1234567890', 6);
    const secretNumber = nanoid();

    sendMsg(userData.email, secretNumber);

    return User.create({ ...userData, userId, isVerified, secretNumber });
}

export async function verification (data) {
    const { email, secretNumber } = data;

    const existedUser = await User.findOne({ email });

    if (!existedUser) 
        return createError(400, 'User not found');

    if (existedUser.isVerified === true)
        return createError(400, 'User already verified');

    if (existedUser.secretNumber !== secretNumber)
        return createError(400, 'Wrong verification code');

    await User.updateMany(
        { email: email },
        {
            isVerified: true,
            secretNumber: 0,
        },
        { new: true }
    );

    return User.findOne({ email });
}

export async function login (data) {
    const { email, password } = data;

    const existedUser = await User.findOne({ email });
    if (!existedUser) return createError(400, 'User not found');

    const isValidPassword = await bcrypt.compare(password, existedUser.password);
    if (!isValidPassword) return createError(400, 'incorrect password');

    if (existedUser.isVerified === false)
        return createError(400, 'User is not verified');

    const userHistory = await History.findOne({ userId: existedUser.userId });
    const date = new Date().toISOString();
    if (!userHistory) {
        await History.create({
            userId: existedUser.userId,
            lastLogin: date,
        });
    } else {
        await History.findOneAndUpdate(
            { userId: existedUser.userId },
            {
                lastLogin: date,
            }
        );
    }

    return { token: generateToken(existedUser.userId) };
}

export async function getUser (id) {
    return await User.findOne({ userId: id });
}

export async function addAge (age, id) {
    return await User.findOneAndUpdate(
        { userId: id },
        {
            age: age,
        },
        { new: true }
    );
}
