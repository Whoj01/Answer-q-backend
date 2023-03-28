import { verifyToken } from "./jwt"

export function BodyWithToken(req: any) {
  const { body, params } = req
  const token = req.headers.authorization.split(" ")[1]

  const user: any = verifyToken(token)

  return {
    ...body,
    ...params,
    user_id: user.id
  }
}