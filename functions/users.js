import bcrypt from "bcrypt";
import Joi from "joi";
import { customAlphabet } from "nanoid";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/users";
import { History } from "../models/history";
import { sendMsg } from "../helpers/sendgrid";
import { generateToken, getUserDataFromToken } from "../helpers/jwt";

export async function createUser(req, res) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ru"] },
    }),
    password: Joi.string().min(4).max(15).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const existedUser = await User.findOne({ email: req.body.email });
  if (existedUser) return res.status(400).send("User already exists.");

  const hashedPass = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPass;
  const userId = uuidv4();

  const isVerified = false;
  const nanoid = customAlphabet("1234567890", 6);
  const secretNumber = nanoid();

  sendMsg(req.body.email, secretNumber);

  res.send(
    await User.create({ ...req.body, userId, isVerified, secretNumber })
  );
}

export async function verification(req, res) {
  const { email, secretNumber } = req.body;

  const existedUser = await User.findOne({ email });

  if (!existedUser) return res.status(400).send("User not found");

  if (existedUser.isVerified === true)
    return res.status(400).send("User already verified");

  if (existedUser.secretNumber != secretNumber)
    return res.status(400).send("Wrong verification code");

  await User.updateMany(
    { email: email },
    {
      isVerified: true,
      secretNumber: 0,
    },
    { new: true }
  );

  res.send(await User.findOne({ email }));
}

export async function login(req, res) {
  const { email, password } = req.body;

  const existedUser = await User.findOne({ email });
  if (!existedUser) return res.status(400).send("User not found");

  const isValidPassword = await bcrypt.compare(password, existedUser.password);
  if (!isValidPassword) return res.status(400).send("incorrect password");

  if (existedUser.isVerified === false)
    return res.status(400).send("User is not verified");

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

  res.send({ token: generateToken(existedUser.userId) });
}

export async function getUser(req, res) {
  // console.log(req.headers.authorization)
  // checkAuth(userData);
  const userData = getUserDataFromToken(req.headers.authorization)
  
  res.send(await User.findOne({ userId: userData.userId }).exec());
}
