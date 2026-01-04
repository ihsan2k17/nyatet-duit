
export class EntityMasterMenu {
    private children: EntityMasterMenu[] = []
    constructor (
        public id: number,
        public nama: string,
        public route: string,
        public urut: number,
        public icon: string,
        public iconName: string,
        public parentId?: number|null,
    ) {}


    addChild(child: EntityMasterMenu) {
        if(child.parentId !== this.id ) {
            throw new Error("Invalid parent-child Relationship")
        }
        this.children.push(child)
    }

    isRoot():boolean {
        return this.parentId === null
    }

    hasChildren():boolean {
        return this.children.length > 0
    }

    sortChildren() {
        this.children.sort((a,b) => a.urut - b.urut)
    }

    getId() {
        return this.id
    }
    
    getNama() {
        return this.nama
    }

    getRoute() {
        return this.route
    }

    getIcon() {
        return this.icon
    }

    getIconName() {
        return this.iconName
    }

    getUrut() {
        return this.urut
    }

    getChildren():EntityMasterMenu[] {
        return this.children
    }

    getParent() {
        return this.parentId
    }

    withNormalizedName(): EntityMasterMenu {
        const menu = new EntityMasterMenu(
            this.id,
            this.nama.trim(),
            this.route,
            this.urut,
            this.icon,
            this.iconName,
            this.parentId
        );
        this.children.forEach(child => {
            menu.addChild(child.withNormalizedName());
        });

        return menu;
    }
}