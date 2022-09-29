import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signToken = (data: any) => jwt.sign(data, JWT_SECRET);

export const decodeToken = (token: string) => jwt.decode(token);

export const hashStr = async (str: string) => {
  try {
    return await bcrypt.hash(str, 10);
  } catch (err) {
    console.error('[HASHSTR]', err);
    return false;
  }
};

export const compareStringToHash = async (
  str: string,
  hash: string | undefined
) => {
  try {
    if (!hash) return false;

    return await bcrypt.compare(str, hash);
  } catch (err) {
    console.error('[COMPAREHASH]', err);
    return false;
  }
};
