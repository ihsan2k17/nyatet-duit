import { ChildMasterMenuEntity } from "../domain/entity_child_mastermenu";
import { MenuRepository } from "../infrastructure/repository_menu";

export class GetChildrenMasterMenuUseCase {
    constructor(private repo: MenuRepository ){}
    async getChildren(parentId: number) {
        const menus = await this.repo.getChildrenMenus(parentId)
        if (!menus.status || !menus.data) {
            return []
        }
        const entities = ChildMasterMenuEntity.collectionFromModels(menus.data)
        return entities.map(e => e.toView())
    }
}