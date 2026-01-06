import { Result } from "@/shared/types/result";
import { EntityMasterMenu } from "../domain/entity_mastermenu";
import { RDMasterMenuModel } from "../domain/model_mastermenu";
import { MenuRepository } from "../infrastructure/repository_menu";

export class GetAllMasterMenuUseCase {
    constructor(private repo: MenuRepository ){}
    async getAll(): Promise<Result<RDMasterMenuModel[]>> { 
        const menus = await this.repo.getAllMenus()

        const entities = menus!.map(raw => new EntityMasterMenu(
            raw.id,
            raw.nama,
            raw.route,
            raw.urut,
            raw.icon,
            raw.iconname,
            raw.parent_id ?? null
        ))
        const tree = this.buildTree(entities)
        const viewModel = (menu: EntityMasterMenu): RDMasterMenuModel => ({
            id: menu.getId(),
            nama: menu.getNama(),
            route: menu.getRoute(),
            urut: menu.getUrut(),
            icon: menu.getIcon(),
            iconName: menu.getIconName(),
            parent_id: menu.getParent(),
            children: menu.getChildren().map(child =>
                viewModel(child)
            )
        })
        const result = tree.map(menu => viewModel( menu.withNormalizedName()))
        return Result.success(result)
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