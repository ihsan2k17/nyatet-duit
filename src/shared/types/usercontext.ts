export interface UserContext {
    userid: number
    username?: string
    name?: string
    role?: string
    [key: string]: unknown
}
