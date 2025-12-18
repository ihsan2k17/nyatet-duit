import jwt from 'jsonwebtoken'
import { TokenPayload } from '../types/token.payloads'
export const VerifyToken =  (token:string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
    } catch {
        throw new Error("TOKEN INVALID")
    }
}