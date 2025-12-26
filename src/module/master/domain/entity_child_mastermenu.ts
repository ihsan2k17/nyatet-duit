import { RDMasterMenuRawModel } from "../domain/model_mastermenu"

export class ChildMasterMenuEntity {
  private constructor(
    readonly id: number,
    readonly name: string,
    readonly route: string,
    readonly parentId: number | null,
    readonly order: number,
    readonly icon?: string,
    readonly iconName?: string
  ) {}

  static fromModel(model: RDMasterMenuRawModel): ChildMasterMenuEntity {
    return new ChildMasterMenuEntity(
      model.id,
      model.nama,
      model.route,
      model.parent_id ?? null,
      model.urut,
      model.icon ?? undefined,
      model.iconname ?? undefined
    )
  }

  /** RULE: menu child boleh kosong */
  static collectionFromModels(models: RDMasterMenuRawModel[]): ChildMasterMenuEntity[] {
    return models.map(this.fromModel)
  }

  /** DTO untuk frontend */
  toView() {
    return {
      id: this.id,
      name: this.name,
      route: this.route,
      parentId: this.parentId,
      order: this.order,
      icon: this.icon,
      iconName: this.iconName
    }
  }
}
