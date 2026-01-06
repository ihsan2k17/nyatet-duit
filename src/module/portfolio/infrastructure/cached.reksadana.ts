import { GetDataListReksadanaUsecase } from "@/module/portfolio/application/usecase.getdatalist_rd"
import { GetCardReksadanaModelView, GetCountReksadanaModelView, GetRekasadanaModelView } from "@/module/portfolio/domain/modelview_rd"
import { Result } from "@/shared/types/result"
import { unstable_cache } from "next/cache"



export const getCachedgetDataUsecase = (
  usecase: GetDataListReksadanaUsecase,
  userid: number
): Promise<Result<GetRekasadanaModelView[]>> =>
  unstable_cache(
    async () => {
      return await usecase.getdata(userid)
    },
    [`reksadana-getDataUsecase-${userid}`],
    { revalidate: 60, tags:['REKSADANA'] }
  )()

export const getCachedReksadanaAggregateUsecase = (
  usecase: GetDataListReksadanaUsecase,
  userid: number
): Promise<Result<GetCountReksadanaModelView>> => 
  unstable_cache(
    async () => {
      return await usecase.getReksadanaAggregate(userid)
    },
    [`reksadana-getReksadanaAggregateUsecase-${userid}`],
    {revalidate: 60, tags:['REKSADANA']}
  )()

export const getCachedkartuDataUsecase = (
  usecase: GetDataListReksadanaUsecase,
  userid: number
):Promise<Result<GetCardReksadanaModelView[]>> => 
  unstable_cache(
    async () => {
      return await usecase.kartuData(userid)
    },
    [`reksadana-kartuDataUsecase-${userid}`],
    {revalidate: 60, tags:['REKSADANA']}
  )()