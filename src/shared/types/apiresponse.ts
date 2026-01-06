export interface MenuApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}