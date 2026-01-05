import { RawReksadana } from "@/module/portfolio/domain/modelview_rd"
import ReksadanaRepository from "@/module/portfolio/infrastructure/repository_reksadana"
import { unstable_cache } from "next/cache"


export const getCachedRawReksadana = (
  repo: ReksadanaRepository,
  userid: number
): Promise<RawReksadana[]> =>
  unstable_cache(
    async () => {
      return await repo.GetReksadana(userid)
    },
    [`reksadana-raw-${userid}`],
    { revalidate: 60 }
  )()
