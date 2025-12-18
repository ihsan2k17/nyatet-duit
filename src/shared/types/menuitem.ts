export type MenuItem = {
  id: number
  nama: string
  route: string
  parent_id: number | null
  urut: number | null
  icon?: string | null
  iconname?: string | null
}
