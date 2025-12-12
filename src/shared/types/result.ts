export type Result<T> = {
    status:boolean
    message?:string
    data?:T
}

export const Result = {
    success: <T>(data?:T, message?: string): Result<T> => ({
        status:true,
        message,
        data
    }),
    error: <T>(message?:string): Result<T> => ({
        status:false,
        message
    })
}