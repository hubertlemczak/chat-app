import { Request, Response } from 'express';

import models from '../models/users.model.js';

const getAll = async (req: Request, res: Response) => {
  const users = await models.getAll();

  res.status(200).json({ users });
};

const getById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await models.getById(id);

  res.status(200).json({ user });
};

export default { getAll, getById };
