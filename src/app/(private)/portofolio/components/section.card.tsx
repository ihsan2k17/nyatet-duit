import { Badge } from '@/shared/ui/components/badge/badge'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/components/card/card'
import { IoMdTrendingUp,IoMdTrendingDown  } from "react-icons/io";
const SectionCard = () => {
    return (
        <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-10 xl:px-10 lg:px-6 **:data-[slot=card]:w-full">
            <Card className='flex flex-1 w-full'>
                <CardHeader>
                    <CardDescription>Total Revenue</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        $1,250.00
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
                        Trending up this month <IoMdTrendingUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Visitors for the last 6 months
                    </div>
                </CardFooter>
            </Card>
            <Card className='flex flex-1 w-full'>
                <CardHeader>
                    <CardDescription>New Customers</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            1,234
                        </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IoMdTrendingDown  />
                            -20%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Down 20% this period <IoMdTrendingDown className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Acquisition needs attention
                    </div>
                </CardFooter>
            </Card>
            <Card className='flex flex-1 w-full'>
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
    )
}

export default SectionCard
