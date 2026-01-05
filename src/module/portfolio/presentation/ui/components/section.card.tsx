import RekeningCard from '@/module/rekening/presentation/ui/components/rekeningcard'
import { Badge } from '@/shared/ui/components/badge/badge'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/components/card/card'
import { useEffect, useState } from 'react'
import { IoMdTrendingUp } from 'react-icons/io'
import { FetchReksadanaList } from '../../api/reksadana.client'

const SectionCard = () => {
    //const [dataRD, setDataRD] = useState<ReksadanaItem[]>([])
    const [namaPortfolio, setNamaPortfolio] = useState<string[]>([])
    useEffect(() => {
        async function LoadData() {
            const res = await FetchReksadanaList()
            if(res.data && Array.isArray(res.data)) {
                const Card = res.data

                const uniq = Array.from(new Set<string>(Card.map((i) => i.portfolio)))
                setNamaPortfolio(uniq)
            }
        }
        LoadData()
    },[])
    return (
        <div className={`grid grid-cols-1 gap-3 px-4 
            sm:grid-cols-2 xl:grid-cols-3 xl:gap-7 xl:px-7 
            lg:px-5 **:data-[slot=card]:w-full`}>
            <RekeningCard/>
            {namaPortfolio.length > 0 &&
                namaPortfolio.map((name) => (
                    <div key={name} className='flex flex-1 w-full p-1'>
                        <Card className='w-full'>
                            <CardHeader>
                                <CardDescription>Portfolio</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                    {name}
                                </CardTitle>
                                <CardAction>
                                    <Badge variant="outline">
                                        <IoMdTrendingUp />
                                        Active
                                    </Badge>
                                </CardAction>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Info tambahan bisa disini
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                ))
            }

            <div className='flex flex-1 w-full p-1'>
                <Card className='w-full'>
                    <CardHeader>
                        <CardDescription>Active Accounts</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            45,678
                        </CardTitle>
                        <CardAction>
                            <Badge variant="outline">
                                <IoMdTrendingUp />
                                +12.5%
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Strong user retention <IoMdTrendingUp className="size-4" />
                        </div>
                        <div className="text-muted-foreground">Engagement exceed targets</div>
                    </CardFooter>
                </Card>
            </div>
        </div>  
    )
}

export default SectionCard
