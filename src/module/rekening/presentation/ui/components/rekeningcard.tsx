import { Badge } from '@/shared/ui/components/badge/badge'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/components/card/card'
import { CiBank } from "react-icons/ci";
import { HiOutlineStatusOnline } from "react-icons/hi";
import Autoplay from "embla-carousel-autoplay"
import { FetchRekening, RekeningItem } from '../../api/rekening.client';
import { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/components/carousel/carousel';
import { useToast } from '@/shared/ui/components/toast/toast';


const RekeningCard = () => {
    const [loading, setLoading] = useState(false)
    const [dataCard, setDataCard] = useState<RekeningItem[]>([])
    const toast = useToast()
    const toastRef= useRef(toast)
    useEffect(() => {
        toastRef.current = toast
    },[toast])
    useEffect(()=>{
        const loadData = async () => {
            try{
                setLoading(true)
                const res = await FetchRekening()
                if(res.success) {
                    setDataCard(res.data!)
                    setLoading(false)
                } else {toastRef.current.error(res.message!)}
            } catch (error) {
                if (error instanceof Error) {
                    toastRef.current.error("Gak dapet brok data nya, lu gada masukin bulan ini kayanya :( \nDetail: " + error.message)
                } else {
                    toastRef.current.error("Gak dapet brok data nya, tapi error gak jelas tipenya.")
                }
            } finally {
                setLoading(false)
            }
        }
        loadData()
    },[])

    const LoadingText = ({ text }: { text: string }) => {
      return (
        <div className="flex gap-0.5">
          {text.split('').map((char, index) => (
            <span
              key={index}
              style={{
                display: 'inline-block',
                animation: `bounce 1s infinite`,
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {char}
            </span>
          ))}
          <style jsx>{`
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-6px); }
            }
          `}</style>
        </div>
      );
    };

    return (
        <Carousel 
            plugins={[
                Autoplay({
                delay: 2000,
                }),
            ]}
            className="w-full">
            <CarouselContent className='w-full p-1 gap-2'>
                {loading && (
                    <CarouselItem className="basis-full">
                        <div className="flex justify-center py-10">
                            <LoadingText text="Loading Your Balance ..." />
                        </div>
                    </CarouselItem>
                )}
                {!loading && dataCard.map((item) => (
                    <CarouselItem key={item.id} className='basis-full'>
                        <Card className='w-full'>
                            <CardHeader>
                                <CardDescription>Total Revenue</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                    Rp. {item.saldo.toLocaleString("id-ID")}
                                </CardTitle>
                                <CardAction>
                                    <Badge variant="outline">
                                        <HiOutlineStatusOnline className='size-4' />
                                        Active
                                    </Badge>
                                </CardAction>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    {item.nama} 
                                </div>
                                <div className="text-muted-foreground gap-2 flex flex-row items-center">
                                    {item.bank} <CiBank className='size-4'/>
                                </div>
                            </CardFooter>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}

export default RekeningCard
