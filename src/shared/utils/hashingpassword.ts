import bcrypt from "bcrypt"
export async function hashingPassword(params: string) {
    return await bcrypt.hash(params, 10)
} 