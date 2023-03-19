import crypto from "crypto";

export function generateHash(nickname: string) {
  return crypto.createHash("sha256").update(nickname).digest("base64");
}
