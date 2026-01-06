import { Result } from "@/shared/types/result"
import { ChartPortfolioReksadanaUsecase } from "../application/usecase.chartportfolio_rd"
import { chartDataReksadanaModelView } from "../domain/modelview_rd"
import { unstable_cache } from "next/cache"

export const CachedPortfolioChartDataUsecase = (
  usecase: ChartPortfolioReksadanaUsecase,
  userid: number,
  username: string
):Promise<Result<chartDataReksadanaModelView[]>> => 
  unstable_cache(
    async () => {
      return await usecase.ChartData(userid, username)
    },
    [`portfolio-kartuDataUsecase-${userid}`],
    {revalidate: 60, tags:['PORTFOLIO']}
  )()