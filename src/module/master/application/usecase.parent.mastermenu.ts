import { MenuRepository } from "../infrastructure/repository_menu";

export class GetParentMasterMenuUseCase {
    constructor(private repo: MenuRepository ){}
    
    async getParentMenus() {
        const menus = await this.repo.getParentMenus()
        if(menus.status) {
            return menus.data
        } else {
            return menus.message
        }
    }
}