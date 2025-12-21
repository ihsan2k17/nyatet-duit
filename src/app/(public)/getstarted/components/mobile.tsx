'use client'

import Image from 'next/image'
import { useState } from 'react'
import image from "../../../../../public/assets/icon/new-icon.png"
import { useRouter } from 'next/navigation'
const MobileGetStarted = () => {
    const [expend, setExpend] = useState(false)
    const router = useRouter()
    const text = `Brok, let’s be honest, ngatur duit itu bukan soal ribet atau sok finansial, 
        tapi soal bikin hidup lo lebih ke-control dan nggak ngerasa clueless tiap kali 
        liat saldo. Dengan mulai nyatet pemasukan dan pengeluaran secara konsisten, lo 
        jadi lebih aware sama cash flow lo sendiri dan tau ke mana uang lo beneran pergi. 
        Dari situ, nabung nggak lagi terasa maksa, tapi jadi kebiasaan kecil yang pelan-pelan 
        kebentuk tanpa drama. Investasi pun nggak lagi keliatan scary atau cuma buat 
        orang “pinter finansial”, karena lo jalaninnya step by step sesuai pace lo. 
        Ujung-ujungnya, lo tetap bisa enjoy hidup sekarang sambil pelan-pelan 
        ngebangun future yang lebih aman, stabil, dan realistic buat diri lo sendiri.`
    const expendText = 278
    return (
        <div className='flex-1 flex flex-col justify-center items-center p-2'>
            <Image src={image} alt="Icon Menu" height={250} width={250} priority />
            <p className='text-center font-medium text-button-primary text-base p-2 transition-all duration-300'>
                {expend ? text : `${text.slice(0, expendText)}...`}
            </p>
            <button
                onClick={() => {
                    setExpend(!expend)
                }}
                className="text-button-primary text-xs font-semibold mt-2"
                >{expend ? 'Hide':'Show'}</button>
            <button 
                onClick={()=> {
                    router.push("/login")
                }}
                className='flex p-2 w-[90%] justify-center bg-button-primary text-card-primary 
            rounded-4xl mt-3 font-semibold'>Lets See</button>
        </div>
    )
}

export default MobileGetStarted
