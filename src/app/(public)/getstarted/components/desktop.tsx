import React from 'react'

const DesktopGetStarted = () => {
    return (
        <div className='flex-1 flex flex-col justify-center items-center gap-5 p-5 w-full'>
            <label className='text-center font-medium text-button-primary text-lg p-7'>
                Brok, let’s be honest, ngatur duit itu bukan soal ribet atau sok finansial, 
                tapi soal bikin hidup lo lebih ke-control dan nggak ngerasa clueless tiap kali 
                liat saldo. Dengan mulai nyatet pemasukan dan pengeluaran secara konsisten, lo 
                jadi lebih aware sama cash flow lo sendiri dan tau ke mana uang lo beneran pergi. 
                Dari situ, nabung nggak lagi terasa maksa, tapi jadi kebiasaan kecil yang pelan-pelan 
                kebentuk tanpa drama. Investasi pun nggak lagi keliatan scary atau cuma buat 
                orang “pinter finansial”, karena lo jalaninnya step by step sesuai pace lo. 
                Ujung-ujungnya, lo tetap bisa enjoy hidup sekarang sambil pelan-pelan 
                ngebangun future yang lebih aman, stabil, dan realistic buat diri lo sendiri.
            </label>
            <button className='bg-button-primary p-2 px-9 rounded-4xl text-card-primary font-medium text-lg
                transition-all duration-100 hover:font-semibold hover:bg-button-secondary cursor-pointer'>
                Lets See
            </button>
        </div>
    )
}

export default DesktopGetStarted
