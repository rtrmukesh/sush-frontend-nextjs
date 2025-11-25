import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET not defined");

export const generateToken = (
  payload: object,
  expiresInSec: number = 4 * 60 * 60
) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresInSec });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log(error)
    return null;
  }
};
