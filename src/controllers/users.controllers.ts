import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models';
import { IUser } from '../models/user.models';
import config from './../config/config';

function createToken(user: IUser): string {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: '24h',
  });
}

const generateJWT = (user: IUser): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: '12h' },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('Sorry, the JWT culd not be generated!');
        } else resolve(token);
      }
    );
  });
};

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ msg: 'Please, send your email and password!' });

  const user: IUser | null = await User.findOne({ email });
  if (user)
    return res
      .status(400)
      .json({ msg: `Email '${email}' is alreade registered!` });

  const newUser: IUser = new User({ email, password });

  await newUser.save();

  return res.status(201).json({ msg: 'Created!', newUser });
};

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ msg: 'Please, send your email and password!' });

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ msg: `User '${email}' doesn't exist!` });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).json({ msg: 'Incorrect password!' });

  const token = `Bearer ${createToken(user)}`;
  // const token = await generateJWT(user);

  return res.status(201).json({ msg: 'Log In', token });
};
