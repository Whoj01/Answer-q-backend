import { sign, verify } from "jsonwebtoken";
import { User } from "../models/User";

export function signToken(payload: User) {
  return sign(payload, process.env.SECRET, { expiresIn: "2d" });
}

export function verifyToken(token: any) {
  return verify(token, process.env.SECRET);
}
