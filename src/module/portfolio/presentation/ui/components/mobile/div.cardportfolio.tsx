'use client'
import { Label } from '@/shared/ui/components/label/label'
import React, { useEffect, useRef, useState } from 'react'
import { ReksadanaCardItem, ReksadanaClient } from '../../../api/reksadana.client'
import { useToast } from '@/shared/ui/components/toast/toast'
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/components/carousel/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/components/card/card'
import { Badge } from '@/shared/ui/components/badge/badge'
import { IoMdTrendingUp } from 'react-icons/io'
import { RiCommunityFill } from 'react-icons/ri'
import { TbBuildingCommunity } from 'react-icons/tb'

interface Props {
    name?: string|null
}

const DivCardPortfolio = ({name}:Props) => {
    const [data, setData] = useState<ReksadanaCardItem[]>([])
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const toastRef= useRef(toast)
    useEffect(() => {
        toastRef.current = toast
    },[toast])

    useEffect(() => {
        const api = new ReksadanaClient()
        async function LoadData() {
            try {
                setLoading(true)
                const res = await api.FetchReksdanaCard()
                if(res.success === true) {
                    setData(res.data!)
                    setLoading(false)
                } else {toastRef.current.error(res.message!)}
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toastRef.current.error(" \nDetail: " + error.message)
                } else {
                    toastRef.current.error("error gak jelas nih tipenya.")
                }
            } finally {
                setLoading(false)
            }
        }
        LoadData()
    },[])
    return (
        <div className='flex text-sm font-semibold'>
            <div className='flex flex-1 flex-col gap-1'>
                <div className={`text-lg font-semibold text-button-primary mt-2.5`}>
                    <h1>This Your Portfolio {name}</h1>
                </div>
                <div>
                    <Label htmlFor="label description" className='font-normal text-button-primary'>
                        Record individual mutual fund ownership
                    </Label>
                </div>
                <div className='flex flex-1 w-full mt-2.5'>
                    <Carousel 
                        plugins={[
                            Autoplay({
                            delay: 3600,
                            }),
                        ]}
                        className='w-full'>
                        <CarouselContent>
                            {data.map((item) => (
                                <CarouselItem key={item.portfolio} className='flex'>
                                    <Card className='w-full'>
                                        <CardHeader>
                                            <CardDescription>Portfolio</CardDescription>
                                            <CardTitle className="text-xl font-semibold tabular-nums">
                                                {item.portfolio}
                                            </CardTitle>
                                            <CardAction>
                                                <Badge variant="secondary" className='gap-1 text-text-invert'>
                                                    <IoMdTrendingUp className='size-4'/>
                                                    Active
                                                </Badge>
                                            </CardAction>
                                            <div className='flex flex-col w-full'>
                                                <div className="text-xl font-bold tabular-nums">
                                                    Rp. {item.totalNominal.toLocaleString("id-ID")}
                                                </div>
                                                <div className='flex flex-row w-full items-center justify-between'>
                                                    <div className='flex flex-row gap-1 items-center text-sm'>
                                                        Nav 
                                                        <RiCommunityFill className='size-4'/>
                                                        :
                                                        <span className='font-medium tabular-nums'>
                                                            {item.totalNAV.toLocaleString("id-ID")}
                                                        </span>
                                                    </div>
                                                    <div className='flex flex-row gap-1 items-center'>
                                                        Unit
                                                        <TbBuildingCommunity className='size-4'/>
                                                        :
                                                        <span className='font-medium tabular-nums'>
                                                            {item.totalUnit.toLocaleString("id-ID")}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default DivCardPortfolio
