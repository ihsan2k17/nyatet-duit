import { EntityMasterMenu } from "../domain/entity_mastermenu";
import { MenuRepository } from "../infrastructure/repository_menu";

export class GetAllMasterMenuUseCase {
    constructor(private repo: MenuRepository ){}
    async getAll() { 
        const menus = await this.repo.getAllMenus()
        const data = menus.data
        const entities = data!.map(raw => new EntityMasterMenu(
            raw.id,
            raw.nama,
            raw.route,
            raw.urut,
            raw.icon,
            raw.iconname,
            raw.parent_id ?? null
        ))
        const tree = this.buildTree(entities)
        return tree.map(menu => menu.toModel())
    }
    private buildTree(menus: EntityMasterMenu[]):EntityMasterMenu[] {
        const map = new Map<number, EntityMasterMenu>()
        const roots: EntityMasterMenu[] = []

        menus.forEach(menu => map.set(menu.getId(), menu))
        menus.forEach(menu => {
            if (menu.isRoot()) {
                roots.push(menu)
            } else {
                const parent = map.get(menu.getParent()!)
                parent?.addChild(menu)
            }
        })

        roots.forEach(root => root.getChildren())
        return roots
    }
}