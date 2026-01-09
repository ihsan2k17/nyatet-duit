import React, { useEffect, useState } from 'react'
import { ReksadanaAggItem, ReksadanaClient } from '../../../api/reksadana.client'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/components/card/card'
import { FiPackage } from 'react-icons/fi'
import { FaLayerGroup } from 'react-icons/fa6'
import { Separator } from '@/shared/ui/components/separator/separator'
import { Label } from '@/shared/ui/components/label/label'

const DivCardAgg = () => {
    const [dataAgg, setDataAgg] = useState<ReksadanaAggItem>()
    
    useEffect(() => {
        const api = new ReksadanaClient()
        async function LoadAgg() {
            const res = await api.FetchRekaadanaAggregate()
            setDataAgg(res.data)
        }

        LoadAgg()
    },[])
    return (
        <div className={`flex flex-1 flex-col gap-2`}>
            <h2 className={`text-3xl font-bold text-text-primary`}>
                <Label htmlFor="label description" className='text-[1rem] font-semibold text-text-secondary'>
                    Total Portfolio
                </Label>
                Rp. {dataAgg?.sumPortfolio.toLocaleString("ed-ID")}
            </h2>
            <div className={`flex flex-row gap-3 mt-4 justify-between`}>
                <Card className={`flex flex-1 w-full p-1`}>
                    <CardHeader className='w-full'>
                        <CardTitle className='font-medium text-sm '>Your Product </CardTitle>
                        <Separator/>
                        <div className='flex flex-row justify-between items-center'>
                            <CardTitle className='text-lg font-bold'>{dataAgg?.countProduct}</CardTitle>
                            <div className="rounded-xl bg-muted p-2">
                                <FiPackage className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                <Card className={`flex flex-1 w-full p-1`}>
                    <CardHeader className='w-full'>
                        <CardTitle className='font-medium text-sm'>Your Portfolio</CardTitle>
                        <Separator/>
                        <div className='flex flex-row justify-between items-center'>
                            <CardTitle className='text-lg font-bold'>{dataAgg?.countPortfolio}</CardTitle>
                            <div className="rounded-xl bg-muted p-2">
                                <FaLayerGroup className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}

export default DivCardAgg
