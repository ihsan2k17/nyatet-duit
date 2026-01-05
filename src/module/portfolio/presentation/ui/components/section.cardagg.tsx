import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/components/card/card'
import { useEffect, useState } from 'react'
import { ReksadanaAggItem, ReksadanaClient } from '../../api/reksadana.client'
import { FaLayerGroup, FaWallet } from 'react-icons/fa6'
import { FiPackage } from 'react-icons/fi'

const SectionCardAgg = () => {
    
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
        <div className={`grid grid-cols-1 gap-3  
            sm:grid-cols-2 xl:grid-cols-3 xl:gap-7  
            **:data-[slot=card]:w-full`}>
            {/* <RekeningCard/> */}
            <div className="flex flex-1 w-full p-1">
                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div>
                            <CardDescription className='font-semibold'>Summary Your Portfolio</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums">
                                Rp {dataAgg?.sumPortfolio.toLocaleString("id-ID")}
                                </CardTitle>
                        </div>

                        <div className="rounded-xl bg-muted p-2">
                            <FaWallet className="h-5 w-5 text-muted-foreground" />
                        </div>
                    </CardHeader>
                </Card>
            </div>

            <div className="flex flex-1 w-full p-1">
                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div>
                            <CardDescription className='font-semibold'>Count Your Product</CardDescription>
                                <CardTitle className="text-2xl font-semibold">
                                {dataAgg?.countProduct}
                                </CardTitle>
                        </div>

                        <div className="rounded-xl bg-muted p-2">
                            <FiPackage className="h-5 w-5 text-muted-foreground" />
                        </div>
                    </CardHeader>
                </Card>
            </div>

            <div className="flex flex-1 w-full p-1">
                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div>
                            <CardDescription className='font-semibold'>Count Your Portfolio</CardDescription>
                                <CardTitle className="text-2xl font-semibold">
                                {dataAgg?.countPortfolio}
                                </CardTitle>
                        </div>

                        <div className="rounded-xl bg-muted p-2">
                            <FaLayerGroup className="h-5 w-5 text-muted-foreground" />
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </div>  
    )
}

export default SectionCardAgg
