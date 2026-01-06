import { Result } from "@/shared/types/result"
import { GetAllMasterMenuUseCase } from "../application/usecase.mastermenu"
import { RDMasterMenuModel } from "../domain/model_mastermenu"
import { unstable_cache } from "next/cache"

export const cachedMenu = (
    usecase: GetAllMasterMenuUseCase,
):Promise<Result<RDMasterMenuModel[]>> => unstable_cache(
    async () => {
      return await usecase.getAll()
    },
    [`master-menu`],
    {revalidate: 60, tags:['MASTERMENU']}
)()