import { sign, verify } from "jsonwebtoken";
import { User } from "../models/User";

export function signToken(payload: User | string, time: string | number) {
  return sign({ payload }, process.env.SECRET, { expiresIn: time });
}

export function verifyToken(token: any) {
  return verify(token, process.env.SECRET);
}
