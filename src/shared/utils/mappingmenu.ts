import { MenuItem } from "@/module/master/presentation/api/mastermenu.client";
import { resolveIcon } from "@/shared/utils/icon.registry";

export function MappingMenu(data: MenuItem[]) {
    return data.map(item => ({
        title: item.nama,
        url: item.route,
        icon: resolveIcon(item.iconName),
        isActive: true,
        items: item.children?.length ? 
            item.children.map(child => ({
            title: child.nama,
            url: child.route })) : undefined
    }))
}