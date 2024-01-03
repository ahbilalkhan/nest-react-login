import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const checkPassword = async (saved: string, provided: string) => bcrypt.compare(saved, provided);

export const getPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt)
};

export const getToken = (data: any) =>
  jwt.sign({ ...data }, process.env.TOKEN_SECRET || '', {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
