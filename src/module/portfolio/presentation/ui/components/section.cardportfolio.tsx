'use client'
import { useEffect, useState } from 'react'
import { ReksadanaCardItem, ReksadanaClient } from '../../api/reksadana.client'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/components/card/card'
import { Badge } from '@/shared/ui/components/badge/badge'
import { RiCommunityFill } from "react-icons/ri";
import { TbBuildingCommunity } from "react-icons/tb";
import { IoMdTrendingUp } from 'react-icons/io'

const SectionCardPortfolio = () => {
    const [data, setData] = useState<ReksadanaCardItem[]>([])
    useEffect(() => {
            const api = new ReksadanaClient()
            async function LoadData() {
                const res = await api.FetchReksdanaCard()
                setData(res.data!)
            }
            LoadData()
            
        },[])
    return (
        <div className={`grid grid-cols-1 gap-3  
            sm:grid-cols-2 xl:grid-cols-3 xl:gap-7  
            **:data-[slot=card]:w-full`}>
            {data.length > 0 &&
                data.map((item) => (
                    <div key={item.portfolio} className='flex flex-1 w-full p-1'>
                        <Card className='w-full'>
                            <CardHeader>
                                <CardDescription>Portfolio</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                    {item.portfolio}
                                </CardTitle>
                                <CardAction>
                                    <Badge variant="outline" className='gap-1'>
                                        <IoMdTrendingUp className='size-4'/>
                                        Active
                                    </Badge>
                                </CardAction>
                            </CardHeader>
                            <CardContent className="flex-col items-start text-sm pt-0 space-y-0">
                                <div className="text-2xl font-bold tabular-nums">
                                    Rp. {item.totalNominal.toLocaleString("id-ID")}
                                </div>
                                <div className='flex flex-row items-center justify-between pt-1'>
                                    <div className='flex flex-row gap-1.5 items-center'>
                                        Nav 
                                        <RiCommunityFill className='size-4'/>
                                        :
                                        <span className='font-medium tabular-nums'>
                                            {item.totalNAV.toLocaleString("id-ID")}
                                        </span>
                                    </div>
                                    <div className='flex flex-row gap-1.5 items-center'>
                                        Unit
                                        <TbBuildingCommunity className='size-4'/>
                                        :
                                        <span className='font-medium tabular-nums'>
                                            {item.totalUnit.toLocaleString("id-ID")}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))
            }
        </div>
    )
}

export default SectionCardPortfolio
