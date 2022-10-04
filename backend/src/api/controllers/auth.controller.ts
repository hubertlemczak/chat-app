import { Request, Response } from 'express';

import dbClient from '../../utils/dbClient';
import { compareStringToHash, signToken } from '../../auth/index.js';

const login = async (req: Request, res: Response) => {
  const user = await validateCredentials(req.body);
  const token = signToken(user);

  res.status(200).json({ token });
};

type validateCredentialsArgs = {
  usernameOrEmail: string;
  password: string;
};

const validateCredentials = async ({
  usernameOrEmail,
  password,
}: validateCredentialsArgs) => {
  if (!usernameOrEmail || !password) {
    throw Error('Missing fields in request body');
  }

  const username = usernameOrEmail.includes('@') ? undefined : usernameOrEmail;
  const email = usernameOrEmail.includes('@') ? usernameOrEmail : undefined;

  const user = await dbClient.user.findUnique({
    where: { username, email },
  });

  const isValid = await compareStringToHash(password, user?.password);
  if (!isValid) {
    throw Error('Invalid credentials');
  }

  return { id: user?.id, username: user?.username, email: user?.email };
};

export default { login };
