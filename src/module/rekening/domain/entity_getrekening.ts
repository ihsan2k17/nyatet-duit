import { capitalize } from "@/shared/utils/capitalize"

export class EntityGetRekening {
  constructor(
    readonly id: number | null,
    readonly namaRekening: string,
    readonly noRekening: number,
    readonly idUser: number,
    readonly bank: string,
    readonly isActive: boolean
  ) {
    if (!namaRekening) {
      throw new Error("namaRekening is required")
    }
  }

  withNormalizedName(): EntityGetRekening {
    return new EntityGetRekening(
      this.id,
      capitalize(this.namaRekening),
      this.noRekening,
      this.idUser,
      this.bank,
      this.isActive
    )
  }
}
