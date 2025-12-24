export interface RDMasterMenuRawModel {
    id:number,
    nama: string,
    route: string,
    parent_id?: number|null,
    urut: number,
    icon: string,
    iconname: string,
}
export interface RDMasterMenuModel {
    id:number,
    nama: string,
    route: string,
    parent_id?: number|null,
    urut: number,
    icon: string,
    iconName: string,
    children: RDMasterMenuModel[]

}