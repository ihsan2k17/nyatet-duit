import { JwtPayload } from "jsonwebtoken"

export interface TokenPayload extends JwtPayload{
  userid: number
  username: string
  name: string
  isonline: boolean
}
