import bcrypt from "bcrypt"
export async function checkPassword(plain:string, hash: string) {
    const isValidate = await bcrypt.compare(plain, hash)
    if(!isValidate) {
        throw new Error("Incorrect your Password")
    }
}