export interface MenuUserModel {
    id: number
    nama: string
    route: string
    access: boolean
    parent_id?: number
    urut: number
    isactive: string,
    icon?: string
    iconname?: string
}