'use client'
import React, { useEffect, useState } from 'react'
import { ReksadanaCardItem, ReksadanaClient } from '../../api/reksadana.client'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/components/card/card'
import { Badge } from '@/shared/ui/components/badge/badge'
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
        <div className={`grid grid-cols-1 gap-3 px-4 
            sm:grid-cols-2 xl:grid-cols-3 xl:gap-7 xl:px-7 
            lg:px-5 **:data-[slot=card]:w-full`}>
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
                                    <Badge variant="outline">
                                        <IoMdTrendingUp />
                                        Active
                                    </Badge>
                                </CardAction>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Rp. {item.totalNominal.toLocaleString("id-ID")}
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                ))
            }
        </div>
    )
}

export default SectionCardPortfolio
